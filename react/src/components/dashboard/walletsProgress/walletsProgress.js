import React from 'react';
import { connect } from 'react-redux';
import { translate } from '../../../translate/translate';
import {
  triggerToaster,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import {
  SyncErrorBlocksRender,
  SyncPercentageRender,
  LoadingBlocksRender,
  TranslationComponentsRender,
  ChainActivationNotificationRender,
  VerifyingBlocksRender,
  WalletsProgressRender,
} from './walletsProgress.render';
import mainWindow from '../../../util/mainWindow';

class WalletsProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      prevProgress: {},
      isWindows: false,
      isWindowsWorkaroundEnabled: false,
    };
    this.isWinSyncPercBelowThreshold = this.isWinSyncPercBelowThreshold.bind(this);
    this.applyWindowsSyncWorkaround = this.applyWindowsSyncWorkaround.bind(this);
  }

  componentWillMount() {
    const _mainWindow = mainWindow;
    const _isWindows = mainWindow.isWindows;

    if (_isWindows) {
      _mainWindow.getMaxconKMDConf()
      .then((res) => {
        if (!res ||
            Number(res) !== 1) {
          this.setState({
            isWindowsWorkaroundEnabled: false,
            isWindows: _isWindows,
          });
        } else {
          this.setState({
            isWindowsWorkaroundEnabled: true,
            isWindows: _isWindows,
          });
        }
      });
    }
  }

  applyWindowsSyncWorkaround() {
    const _mainWindow = mainWindow;

    _mainWindow.setMaxconKMDConf(1)
    .then((res) => {
      if (res) {
        this.setState({
          isWindowsWorkaroundEnabled: true,
        });

        Store.dispatch(
          triggerToaster(
            translate('DASHBOARD.WIN_SYNC_WORKAROUND_APPLIED'),
            translate('TOASTR.WALLET_NOTIFICATION'),
            'success'
          )
        );

        setTimeout(() => {
          _mainWindow.appExit();
        }, 2000);
      } else {
        Store.dispatch(
          triggerToaster(
            translate('DASHBOARD.WIN_SYNC_WORKAROUND_APPLY_FAILED'),
            translate('TOASTR.WALLET_NOTIFICATION'),
            'error'
          )
        );
      }
    });
  }

  componentWillReceiveProps(props) {
    if (props.ActiveCoin &&
        props.ActiveCoin.progress &&
        Number(props.ActiveCoin.progress.longestchain) === 0) {
      let _progress = props.ActiveCoin.progress;

      if (this.state.prevProgress &&
          this.state.prevProgress.longestchain &&
          Number(this.state.prevProgress.longestchain) > 0) {
        _progress.longestchain = this.state.prevProgress.longestchain;
      }

      this.setState(Object.assign({}, this.state, {
        prevProgress: _progress,
      }));
    } else {
      this.setState(Object.assign({}, this.state, {
        prevProgress: props.ActiveCoin.progress,
      }));
    }

    if (this.isWinSyncPercBelowThreshold() !== -777 &&
        this.state.isWindowsWorkaroundEnabled &&
        !this.isWinSyncPercBelowThreshold()) {
      const _mainWindow = mainWindow;

      _mainWindow.setMaxconKMDConf()
      .then((res) => {
        if (res) {
          this.setState({
            isWindowsWorkaroundEnabled: false,
          });

          Store.dispatch(
            triggerToaster(
              translate('DASHBOARD.WIN_SYNC_WORKAROUND_REVERTED'),
              translate('TOASTR.WALLET_NOTIFICATION'),
              'info',
              false
            )
          );
        } else {
          Store.dispatch(
            triggerToaster(
              translate('DASHBOARD.WIN_SYNC_WORKAROUND_APPLY_FAILED'),
              translate('TOASTR.WALLET_NOTIFICATION'),
              'error'
            )
          );
        }
      });
    }
  }

  isWinSyncPercBelowThreshold() {
    if (this.state.prevProgress &&
        this.state.prevProgress.longestchain &&
        this.state.prevProgress.blocks &&
        this.state.prevProgress.longestchain > 0 &&
        this.state.prevProgress.blocks > 0) {
      if (Number(this.state.prevProgress.blocks) * 100 / Number(this.state.prevProgress.longestchain) < 30) {
        return true;
      }
    } else {
      return -777;
    }
  }

  renderChainActivationNotification() {
    const _progress = this.props.ActiveCoin.progress;

    if (_progress) {
      if ((!_progress.blocks && !_progress.longestchain) ||
          (_progress.blocks < _progress.longestchain) ||
          this.props.ActiveCoin.rescanInProgress) {
        return ChainActivationNotificationRender.call(this);
      }
    } else {
      if (this.props.ActiveCoin.rescanInProgress) {
        return ChainActivationNotificationRender.call(this);
      } else {
        return null;
      }
    }
  }

  parseActivatingBestChainProgress() {
    let _debugLogLine;

    if (this.props.Settings.debugLog.indexOf('\n') > -1) {
      const _debugLogMulti = this.props.Settings.debugLog.split('\n');

      for (let i = 0; i < _debugLogMulti.length; i++) {
        if (_debugLogMulti[i].indexOf('progress=') > -1) {
          _debugLogLine = _debugLogMulti[i];
        }
      }
    } else {
      _debugLogLine = this.props.Settings.debugLog;
    }

    if (_debugLogLine) {
      const temp = _debugLogLine.split(' ');
      let currentBestChain;
      let currentProgress;

      for (let i = 0; i < temp.length; i++) {
        if (temp[i].indexOf('height=') > -1) {
          currentBestChain = temp[i].replace('height=', '');
        }

        if (temp[i].indexOf('progress=') > -1) {
          currentProgress = Number(temp[i].replace('progress=', '')) * 1000;

          if (currentProgress > 100) {
            currentProgress = Number(temp[i].replace('progress=', '')) * 100;
          }
        }
      }

      if (this.props.ActiveCoin.progress.remoteKMDNode &&
          this.props.ActiveCoin.progress.remoteKMDNode.blocks) {
        const longestHeight = this.props.ActiveCoin.progress.remoteKMDNode.blocks;

        return [
          currentBestChain,
          currentProgress,
          longestHeight
        ];
      } else {
        return [
          currentBestChain,
          currentProgress
        ];
      }
    }
  }

  renderSyncPercentagePlaceholder() {
    const _progress = this.props.ActiveCoin.progress;

    // activating best chain
    if (_progress &&
        _progress.code &&
        _progress.code === -28 &&
        this.props.Settings.debugLog) {
      if (_progress.message === 'Activating best chain...') {
        const _parseProgress = this.parseActivatingBestChainProgress();

        if (_parseProgress &&
            _parseProgress[1]) {
          return SyncPercentageRender.call(this, `${_parseProgress[1].toFixed(2)}%`, _parseProgress[0], _parseProgress[2] ? _parseProgress[2] : null);
        } else {
          return LoadingBlocksRender.call(this);
        }
      } else if (_progress.message === 'Verifying blocks...') {
        return VerifyingBlocksRender.call(this);
      }
    }

    if (_progress &&
        _progress.blocks === 0) {
      return SyncErrorBlocksRender.call(this);
    }

    if (_progress &&
        _progress.blocks &&
        _progress.blocks > 0) {
      const syncPercentage = (parseFloat(parseInt(_progress.blocks, 10) * 100 / parseInt(Number(_progress.longestchain) || Number(this.state.prevProgress.longestchain), 10)).toFixed(2) + '%').replace('NaN', 0);
      return SyncPercentageRender.call(this, syncPercentage === 1000 ? 100 : syncPercentage);
    }

    return LoadingBlocksRender.call(this);
  }

  renderLB(translationID) {
    return TranslationComponentsRender.call(this, translationID);
  }

  renderRescanProgress() {
    if (this.props.Settings.debugLog.indexOf('Still rescanning') > -1 &&
        ((this.props.ActiveCoin.rescanInProgress) || (this.props.ActiveCoin.progress && this.props.ActiveCoin.progress.code && this.props.ActiveCoin.progress.code === -28 && this.props.ActiveCoin.progress.message === 'Rescanning...'))) {
      const temp = this.props.Settings.debugLog.split(' ');
      let currentProgress;

      for (let i = 0; i < temp.length; i++) {
        if (temp[i].indexOf('Progress=') > -1) {
          currentProgress = Number(temp[i].replace('Progress=', '')) * 100;
        }
      }

      return currentProgress;
    } else {
      return null;
    }
  }

  renderActivatingBestChainProgress() {
    if (this.props.Settings &&
        this.props.Settings.debugLog &&
        !this.props.ActiveCoin.rescanInProgress) {
      if (this.props.Settings.debugLog.indexOf('UpdateTip') > -1 &&
          !this.props.ActiveCoin.progress &&
          !this.props.ActiveCoin.progress.blocks) {
        const temp = this.props.Settings.debugLog.split(' ');
        let currentBestChain;
        let currentProgress;

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].indexOf('height=') > -1) {
            currentBestChain = temp[i].replace('height=', '');
          }
          if (temp[i].indexOf('progress=') > -1) {
            currentProgress = Number(temp[i].replace('progress=', '')) * 100;
          }
        }

        // fallback to local data if remote node is inaccessible
        if (this.props.ActiveCoin.progress.remoteKMDNode &&
            !this.props.ActiveCoin.progress.remoteKMDNode.blocks) {
          return (
            `: ${currentProgress}% (${ translate('INDEX.ACTIVATING_SM') })`
          );
        } else {
          if (this.props.ActiveCoin.progress.remoteKMDNode &&
              this.props.ActiveCoin.progress.remoteKMDNode.blocks) {
            return(
              `: ${Math.floor(currentBestChain * 100 / this.props.ActiveCoin.progress.remoteKMDNode.blocks)}% (${ translate('INDEX.BLOCKS_SM') } ${currentBestChain} / ${this.props.ActiveCoin.progress.remoteKMDNode.blocks})`
            );
          }
        }
      } else if (
          this.props.Settings.debugLog.indexOf('Still rescanning') > -1 &&
          !this.props.ActiveCoin.progress ||
          !this.props.ActiveCoin.progress.blocks
        ) {
        const temp = this.props.Settings.debugLog.split(' ');
        let currentProgress;

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].indexOf('Progress=') > -1) {
            currentProgress = Number(temp[i].replace('Progress=', '')) * 100;
          }
        }

        // activating best chain
        if (this.props.ActiveCoin.progress &&
            this.props.ActiveCoin.progress.code &&
            this.props.ActiveCoin.progress.code === -28 &&
            this.props.Settings.debugLog) {
          const _blocks = this.parseActivatingBestChainProgress();

          if (_blocks &&
              _blocks[0]) {
            return (
              `: ${_blocks[0]} (${ translate('DASHBOARD.CURRENT_BLOCK_SM') })`
            );
          } else {
            return null;
          }
        } else {
          if (currentProgress) {
            return (
              `: ${currentProgress.toFixed(2)}% (${ translate('INDEX.RESCAN_SM') })`
            );
          } else {
            return null;
          }
        }
      } else if (this.props.Settings.debugLog.indexOf('Rescanning last') > -1) {
        return (
          `: (${ translate('INDEX.RESCANNING_LAST_BLOCKS') })`
        );
      } else if (
          this.props.Settings.debugLog.indexOf('LoadExternalBlockFile:') > -1 ||
          this.props.Settings.debugLog.indexOf('Reindexing block file') > -1
        ) {
        return (
          `: (${ translate('INDEX.REINDEX') })`
        );
      } else {
        return (
          <span> ({ translate('INDEX.DL_BLOCKS') })</span>
        );
      }
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin) {
      return WalletsProgressRender.call(this);
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    Dashboard: state.Dashboard,
    Settings: {
      debugLog: state.Settings.debugLog,
    },
    ActiveCoin: {
      mode: state.ActiveCoin.mode,
      coin: state.ActiveCoin.coin,
      progress: state.ActiveCoin.progress,
      rescanInProgress: state.ActiveCoin.rescanInProgress,
    },
  };
};

export default connect(mapStateToProps)(WalletsProgress);