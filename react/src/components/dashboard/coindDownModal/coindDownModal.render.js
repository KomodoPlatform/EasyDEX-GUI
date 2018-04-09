import React from 'react';
import translate from '../../../translate/translate';

const CoindDownModalRender = function() {
  let _debuglog = this.props.debugLog || '';

  if (_debuglog.indexOf('ENOENT') > -1) {
    _debuglog = 'Error: ' + (this.props.ActiveCoin.coin === 'KMD' ? 'Komodod' : `Komodod / ${this.props.ActiveCoin.coin}`) + translate('INDEX.COIND_DOWN_MODAL_ERROR');
  }

  return (
    <div>
      <div
        className={ 'modal modal-3d-sign coind-down-modal ' + (this.state.display ? 'show in' : 'fade hide') }
        id="AddCoinDilogModel-login">
        <div
          onClick={ this.dismiss }
          className="modal-close-overlay"></div>
        <div className="modal-dialog modal-center modal-lg">
          <div
            onClick={ this.dismiss }
            className="modal-close-overlay"></div>
          <div className="modal-content">
            <div className="modal-header bg-orange-a400 wallet-send-header">
              <button
                type="button"
                className="close white"
                onClick={ this.dismiss }>
                <span>×</span>
              </button>
              <h4 className="modal-title white">
                { this.props.ActiveCoin.coin === 'KMD' ? 'Komodod' : `Komodod / ${this.props.ActiveCoin.coin}` }&nbsp;
                { translate('INDEX.IS_DOWN') }!
              </h4>
            </div>
            <div className="modal-body">
              <div className="vertical-align text-center">
                <div className="page-content vertical-align-middle">
                  <i
                    className="icon fa-refresh manual-debuglog-refresh pointer"
                    onClick={ this.refreshDebugLog }></i>
                  <div className="text-left">
                    <label className="switch">
                      <input
                        type="checkbox"
                        value="on"
                        checked={ this.state.toggleDebugLog } />
                      <div
                        className="slider"
                        onClick={ this.toggleDebugLog }></div>
                    </label>
                    <div
                      className="toggle-label margin-right-15 pointer"
                      onClick={ this.toggleDebugLog }>
                      { translate('INDEX.SHOW') } debug.log
                    </div>
                  </div>
                  { !this.state.toggleDebugLog &&
                    <strong>Debug.log ({ translate('INDEX.LAST_50_LINES') })</strong>
                  }
                  { this.state.toggleDebugLog &&
                    <strong>{ this.props.ActiveCoin.coin === 'KMD' ? 'Komodod' : `Komodod / ${this.props.ActiveCoin.coin} stdout` }</strong>
                  }
                  <div className="form-group form-material floating">
                    <textarea
                      readOnly
                      className="form-control"
                      value={ !this.state.toggleDebugLog ? _debuglog : this.state.coindStdOut }></textarea>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    id="loginbtn"
                    onClick={ this.dismiss }>OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={ 'modal-backdrop ' + (this.state.display ? 'show in' : 'fade hide') }></div>
    </div>
  );
};

export default CoindDownModalRender;