import React from 'react';
import { connect } from 'react-redux';
import translate from '../../../translate/translate';
import Config from '../../../config';
import { secondsToString } from '../../../util/time';
import { coindList } from '../../../util/coinHelper';
import { getDebugLog } from '../../../actions/actionCreators';
import Store from '../../../store';
import mainWindow from '../../../util/mainWindow';

class DebugLogPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      appRuntimeLog: [],
      debugLinesCount: 10,
      debugTarget: 'none',
      nativeOnly: Config.iguanaLessMode,
      toggleAppRuntimeLog: false,
      pristine: true,
    };
    this.readDebugLog = this.readDebugLog.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.getAppRuntimeLog = this.getAppRuntimeLog.bind(this);
    this.toggleAppRuntimeLog = this.toggleAppRuntimeLog.bind(this);
    this.renderAppRuntimeLog = this.renderAppRuntimeLog.bind(this);
    this.checkInputVals = this.checkInputVals.bind(this);
  }

  componentWillMount() {
    if (this.props.Main.coins &&
        this.props.Main.coins.native &&
        Object.keys(this.props.Main.coins.native).length === 0) {
      this.setState({
        toggleAppRuntimeLog: true,
      });
      this.getAppRuntimeLog();
    }
  }

  readDebugLog() {
    let _target = this.state.debugTarget;

    if (_target === 'Komodo') {
      _target = null;
    }

    this.setState(Object.assign({}, this.state, {
      pristine: false,
    }));

    Store.dispatch(
      getDebugLog(
        'komodo',
        this.state.debugLinesCount,
        _target
      )
    );
  }

  renderAppRuntimeLog() {
    const _appRuntimeLog = this.state.appRuntimeLog;
    let _items = [];

    for (let i = 0; i < _appRuntimeLog.length; i++) {
      _items.push(
        <p key={ `app-runtime-log-entry-${i}` }>
          <span>{ secondsToString(_appRuntimeLog[i].time, true) }</span>
          <span className="padding-left-30">{ _appRuntimeLog[i].msg.indexOf('{') === -1 ? _appRuntimeLog[i].msg : JSON.stringify(_appRuntimeLog[i].msg, null, '') }</span>
        </p>
      );
    }

    return _items;
  }

  toggleAppRuntimeLog() {
    this.setState(Object.assign({}, this.state, {
      toggleAppRuntimeLog: !this.state.toggleAppRuntimeLog,
    }));

    this.getAppRuntimeLog();
  }

  getAppRuntimeLog() {
    const _appRuntimeLog = mainWindow.getAppRuntimeLog;

    _appRuntimeLog()
    .then((json) => {
      this.setState(Object.assign({}, this.state, {
        appRuntimeLog: json,
      }));
    });
  }

  renderDebugLogData() {
    if (this.props.Settings.debugLog &&
        !this.state.pristine) {
      const _debugLogDataRows = this.props.Settings.debugLog.split('\n');

      if (_debugLogDataRows &&
          _debugLogDataRows.length &&
          this.props.Settings.debugLog.indexOf('ENOENT') === -1) {
        return _debugLogDataRows.map((_row) =>
          <div
            key={ `settings-debuglog-${Math.random(0, 9) * 10}` }
            className="padding-bottom-5">{ _row }</div>
        );
      } else {
        return (
          <span>{ translate('INDEX.EMPTY_DEBUG_LOG') }</span>
        );
      }
    } else {
      return null;
    }
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderCoinListSelectorOptions() {
    let _items = [];
    let _nativeCoins = coindList();

    _items.push(
      <option
        key={ `coind-walletdat-coins-none` }
        value="none">{ translate('SETTINGS.PICK_A_COIN') }</option>
    );
    for (let i = 0; i < _nativeCoins.length; i++) {
      if (_nativeCoins[i] === 'KMD') {
        _nativeCoins[i] = 'Komodo';
      }

      _items.push(
        <option
          key={ `coind-debuglog-coins-${ _nativeCoins[i] }` }
          value={ `${_nativeCoins[i]}` }>{ `${_nativeCoins[i]}` }</option>
      );
    }

    return _items;
  }

  checkInputVals() {
    if (!Number(this.state.debugLinesCount) ||
        Number(this.state.debugLinesCount) < 1 ||
        !this.state.debugLinesCount ||
        this.state.debugTarget === 'none') {
      return true;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          { this.props.Main.coins &&
            this.props.Main.coins.native &&
            Object.keys(this.props.Main.coins.native).length > 0 &&
            <p>{ translate('INDEX.DEBUG_LOG_DESC') }</p>
          }
          <div className="margin-top-30">
            <span className="pointer toggle">
              <label className="switch">
                <input
                  type="checkbox"
                  name="settings-app-debug-toggle"
                  value={ this.state.toggleAppRuntimeLog }
                  checked={ this.state.toggleAppRuntimeLog } />
                <div
                  className="slider"
                  onClick={ this.toggleAppRuntimeLog }></div>
              </label>
              <span
                className="title"
                onClick={ this.toggleAppRuntimeLog }>{ translate('SETTINGS.SHOW_APP_RUNTIME_LOG') }</span>
            </span>
          </div>
          { !this.state.toggleAppRuntimeLog &&
            this.props.Main.coins &&
            this.props.Main.coins.native &&
            Object.keys(this.props.Main.coins.native).length > 0 &&
            <div className="read-debug-log-import-form">
              <div className="form-group form-material floating">
                <input
                  type="text"
                  className="form-control"
                  name="debugLinesCount"
                  id="readDebugLogLines"
                  value={ this.state.debugLinesCount }
                  onChange={ this.updateInput } />
                <label
                  className="floating-label"
                  htmlFor="readDebugLogLines">{ translate('INDEX.DEBUG_LOG_LINES') }</label>
              </div>
              <div className="form-group form-material floating">
                <select
                  className="form-control form-material"
                  name="debugTarget"
                  id="settingsDelectDebugLogOptions"
                  onChange={ this.updateInput }>
                  { this.renderCoinListSelectorOptions() }
                </select>
                <label
                  className="floating-label"
                  htmlFor="settingsDelectDebugLogOptions">{ translate('INDEX.TARGET') }</label>
              </div>
              <div className="col-sm-12 col-xs-12 text-align-center">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  disabled={ this.checkInputVals() }
                  onClick={ this.readDebugLog }>{ translate('INDEX.LOAD_DEBUG_LOG') }</button>
              </div>
              <div className="row">
                <div className="col-sm-12 col-xs-12 text-align-left">
                  <div className="padding-top-40 padding-bottom-20 horizontal-padding-0">{ this.renderDebugLogData() }</div>
                </div>
              </div>
            </div>
          }
          { this.state.toggleAppRuntimeLog &&
            <div className="margin-top-20">{ this.renderAppRuntimeLog() }</div>
          }
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    Settings: state.Settings,
    Main: state.Main,
  };
};

export default connect(mapStateToProps)(DebugLogPanel);
