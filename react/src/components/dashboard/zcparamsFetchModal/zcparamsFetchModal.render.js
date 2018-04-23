import React from 'react';
import translate from '../../../translate/translate';

const ZcparamsFetchModalRender = function() {
  return (
    <div>
      <div className={ 'modal modal-3d-sign zcparams-fetch-modal ' + (this.state.display ? 'show in' : 'fade hide') }>
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
              <h4 className="modal-title white">{ translate('ZCPARAMS_FETCH.ZCPARAMS_FETCH') }</h4>
            </div>
            <div className="modal-body">
              <div className="vertical-align text-center">
                <div className="page-content vertical-align-middle">
                  <div>{ translate('ZCPARAMS_FETCH.SELECT_ZCPARAMS_SOURCE') }</div>
                  <div className="form-group floating padding-top-15 padding-bottom-15">
                    <div className="col-sm-12 center padding-top-10">
                      <div className="col-sm-6">
                        <select
                          className="form-control form-material"
                          name="dlOption"
                          value={ this.state.dlOption }
                          onChange={ (event) => this.updateInput(event) }
                          autoFocus>
                          { this.renderDLOptions() }
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-12 center padding-top-20">
                      <div className="col-sm-6">
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          onClick={ this._downloadZCashParamsPromise }>{ translate('ZCPARAMS_FETCH.DOWNLOAD') }</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 padding-top-15">
                    { this.renderUpdateStatus() }
                  </div>
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

export default ZcparamsFetchModalRender;