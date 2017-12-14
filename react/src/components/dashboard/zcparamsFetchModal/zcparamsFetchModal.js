import React from 'react';
import { connect } from 'react-redux';
import {
  toggleZcparamsFetchModal,
  downloadZCashParamsPromise,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import Config from '../../../config';
import { translate } from '../../../translate/translate';
import mainWindow from '../../../util/mainWindow';

import ZcparamsFetchModalRender from './zcparamsFetchModal.render';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect(`http://127.0.0.1:${Config.agamaPort}`);

let updateProgressBar = {
  zcparams: {
    proving: -1,
    verifying: -1,
  },
};

class ZcparamsFetchModal extends React.Component {
  constructor() {
    super();
    this.state = {
      display: true,
      updateLog: [],
      zcparamsSources: {},
      dlOption: 'agama.komodoplatform.com',
      done: false,
    };
    this.dismiss = this.dismiss.bind(this);
    this._downloadZCashParamsPromise = this._downloadZCashParamsPromise.bind(this);
  }

  _downloadZCashParamsPromise() {
    let _updateLog = [];

    updateProgressBar.zcparams = {
      proving: 0,
      verifying: 0,
    };
    _updateLog.push(`${ translate('ZCPARAMS_FETCH.DOWNLOADING_ZCASH_KEYS') }...`);
    this.setState(Object.assign({}, this.state, {
      updateLog: _updateLog,
      done: false,
    }));

    downloadZCashParamsPromise(this.state.dlOption);
  }

  dismiss() {
    Store.dispatch(toggleZcparamsFetchModal(false));
  }

  componentWillUnmount() {
    socket.removeAllListeners('zcparams', msg => this.updateSocketsData(msg));
  }

  componentWillMount() {
    socket.on('zcparams', msg => this.updateSocketsData(msg));

    this.setState(Object.assign({}, this.state, {
      zcparamsSources: mainWindow.zcashParamsDownloadLinks,
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.displayZcparamsModal !== nextProps.displayZcparamsModal) {
      this.setState(Object.assign({}, this.state, {
        display: nextProps.displayZcparamsModal,
      }));
    }
  }

  updateSocketsData(data) {
    if (data &&
        data.msg &&
        data.msg.type === 'zcpdownload') {
      if (data.msg.status === 'progress' &&
          data.msg.progress &&
          data.msg.progress < 100) {
        this.setState(Object.assign({}, this.state, {
          updateProgressPatch: data.msg.progress,
        }));
        updateProgressBar.zcparams[data.msg.file] = data.msg.progress;
      } else {
        if (data.msg.status === 'progress' &&
            data.msg.progress &&
            data.msg.progress === 100) {
          let _updateLog = this.state.updateLog;
          this.setState(Object.assign({}, this.state, {
            updateLog: _updateLog,
          }));
          updateProgressBar.zcparams[data.msg.file] = 100;
        } else if (data.msg.status === 'done') {
          let _updateLog = this.state.updateLog;

          if (data.msg.file === 'proving') {
            _updateLog = [];
            _updateLog.push(translate('ZCPARAMS_FETCH.BOTH_KEYS_VERIFIED'));
            this.setState(Object.assign({}, this.state, {
              updateLog: _updateLog,
              done: true,
            }));

            window.require('electron').remote.getCurrentWindow().zcashParamsExistPromise()
            .then((res) => {
              const _errors = zcashParamsCheckErrors(res);
              window.require('electron').remote.getCurrentWindow().zcashParamsExist = res;
            });
          } else {
            this.setState(Object.assign({}, this.state, {
              updateLog: _updateLog,
            }));
          }
          updateProgressBar.zcparams[data.msg.file] = -1;
        } else if (data.msg.status === 'error') {
          let _updateLog = this.state.updateLog;

          _updateLog.push(`${translate('ZCPARAMS_FETCH.ZCPARAMS_VERIFICATION_ERROR_P1')} ${data.msg.file} ${translate('ZCPARAMS_FETCH.ZCPARAMS_VERIFICATION_ERROR_P2')}`);
          this.setState(Object.assign({}, this.state, {
            updateLog: _updateLog,
            done: true,
          }));
          updateProgressBar.zcparams = {
            proving: -1,
            verifying: -1,
          };
        }
      }
    }
  }

  renderUpdateStatus() {
    const _updateLogLength = this.state.updateLog.length;
    let items = [];
    let patchProgressBar = null;

    for (let i = 0; i < _updateLogLength; i++) {
      items.push(
        <div key={ `settings-update-log-${i}` }>{ this.state.updateLog[i] }</div>
      );
    }

    if (_updateLogLength) {
      return (
        <div
          className="padding-top-20"
          style={{ minHeight: '140px' }}>
          <h5>{ translate('SETTINGS.PROGRESS') }:</h5>
          <div className="padding-bottom-15">{ items }</div>
          <div className={ updateProgressBar.zcparams.proving > -1 && !this.state.done ? 'progress progress-sm' : 'hide' }>
            <div
              className="progress-bar progress-bar-striped active progress-bar-indicating progress-bar-success font-size-80-percent"
              style={{ width: `${updateProgressBar.zcparams.proving}%` }}>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderDLOptions() {
    let _items = [];
    let _dlOptions = this.state.zcparamsSources;

    for (let key in _dlOptions) {
      _items.push(
        <option
          key={ `zcparams-dloptions-list-${key}` }
          value={ `${key}` }>{ `${key}` }</option>
      );
    }

    return _items;
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    if (this.state.display) {
      return ZcparamsFetchModalRender.call(this);
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    displayZcparamsModal: state.Dashboard.displayZcparamsModal,
  };
};

export default connect(mapStateToProps)(ZcparamsFetchModal);
