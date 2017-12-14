import React from 'react';
import { connect } from 'react-redux';
import {
  toggleCoindDownModal,
  coindGetStdout,
  getDebugLog,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import mainWindow from '../../../util/mainWindow';

import CoindDownModalRender from './coindDownModal.render';

const COIND_DOWN_MODAL_FETCH_FAILURES_THRESHOLD = mainWindow.appConfig.failedRPCAttemptsThreshold || 10;

class CoindDownModal extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
      kmdMainPassiveMode: false,
      coindStdOut: 'Loading...',
      toggleDebugLog: true,
    };
    this.dismiss = this.dismiss.bind(this);
    this.getCoindGetStdout = this.getCoindGetStdout.bind(this);
    this.toggleDebugLog = this.toggleDebugLog.bind(this);
    this.refreshDebugLog = this.refreshDebugLog.bind(this);
  }

  refreshDebugLog() {
    const _coin = this.props.ActiveCoin.coin;

    if (!this.state.toggleDebugLog) {
      if (_coin === 'KMD') {
        Store.dispatch(getDebugLog('komodo', 50));
      } else {
        Store.dispatch(getDebugLog('komodo', 50, _coin));
      }
    } else {
      this.getCoindGetStdout();
    }
  }

  toggleDebugLog() {
    this.setState({
      toggleDebugLog: !this.state.toggleDebugLog,
    });
  }

  getCoindGetStdout() {
    coindGetStdout(this.props.ActiveCoin.coin)
    .then((res) => {
      this.setState({
        coindStdOut: res.msg === 'success' ? res.result : `Error reading ${this.props.ActiveCoin.coin} stdout`,
      });
    });
  }

  dismiss() {
    Store.dispatch(toggleCoindDownModal(false));
  }

  componentWillMount() {
    this.setState(Object.assign({}, this.state, {
      kmdMainPassiveMode: mainWindow.kmdMainPassiveMode,
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.displayCoindDownModal !== nextProps.displayCoindDownModal) {
      this.setState(Object.assign({}, this.state, {
        display: nextProps.displayCoindDownModal,
      }));

      if (nextProps.displayCoindDownModal) {
        this.getCoindGetStdout();
      }
    }
  }

  render() {
    if (this.state.display &&
        !this.state.kmdMainPassiveMode &&
        this.props.ActiveCoin.getinfoFetchFailures >= COIND_DOWN_MODAL_FETCH_FAILURES_THRESHOLD) {
      return CoindDownModalRender.call(this);
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      mode: state.ActiveCoin.mode,
      coin: state.ActiveCoin.coin,
      getinfoFetchFailures: state.ActiveCoin.getinfoFetchFailures,
    },
    displayCoindDownModal: state.Dashboard.displayCoindDownModal,
    debugLog: state.Settings.debugLog,
  };
};

export default connect(mapStateToProps)(CoindDownModal);
