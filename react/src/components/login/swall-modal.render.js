import React from 'react';
import translate from '../../translate/translate';

const SwallModalRender = function() {
  return (
    <div className="swal2-container">
      <div className="swal2-overlay full-opacity display-block"></div>
      <div className="swal2-modal show-swal2 visible swal2-modal-container">
        <div className="swal2-icon swal2-warning pulse-warning display-block">!</div>
        <h2>{ translate('LOGIN.SAVED_WALLET_SEED') }</h2>
        <div className="swal2-content display-block">{ translate('LOGIN.SEED_MAKE_SURE_BACKUP') }</div>
        <hr className="swal2-spacer display-block" />
        <button
          className="swal2-confirm styled swal2-confirm-container"
          onClick={ this.execWalletCreate }>{ translate('LOGIN.YES_I_BACKUP') }</button>
        <button
          className="swal2-cancel styled swal2-cancel-container"
          onClick={ this.toggleSeedBackupModal }>{ translate('LOGIN.CANCEL') }</button>
      </div>
    </div>
  );
};

export default SwallModalRender;