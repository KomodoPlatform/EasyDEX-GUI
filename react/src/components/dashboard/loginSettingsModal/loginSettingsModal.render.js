import React from 'react';
import translate from '../../../translate/translate';
import About from '../about/about';
import Settings from '../settings/settings';

export const LoginSettingsModalRender = function() {
  return (
    <div>
      <div className="modal show login-settings-modal ff">
        <div
          onClick={ this.closeLoginSettingsModal }
          className="modal-close-overlay"></div>
        <div className="modal-dialog modal-center modal-lg">
          <div
            onClick={ this.closeLoginSettingsModal }
            className="modal-close-overlay"></div>
          <div className="modal-content">
            <div className="modal-body modal-body-container">
              { this.props.section === 'settings' &&
                <Settings disableWalletSpecificUI="true" />
              }
              { this.props.section === 'about' &&
                <About />
              }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={ this.closeLoginSettingsModal }>{ translate('INDEX.CLOSE') }</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show in"></div>
    </div>
  );
};