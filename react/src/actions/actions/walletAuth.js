// obsolete(?)

import {
  LOGIN,
  ACTIVE_HANDLE,
} from '../storeType';
import translate from '../../translate/translate';
import Config from '../../config';
import {
  triggerToaster,
  getMainAddressState,
} from '../actionCreators';

export function encryptWallet(_passphrase, cb, coin) {
  const payload = {
    userpass: `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
    agent: 'bitcoinrpc',
    method: 'encryptwallet',
    passphrase: _passphrase,
  };

  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'encryptWallet',
          'Error',
          'error'
        )
      );
    })
    .then(dispatch(walletPassphrase(_passphrase)))
    .then(response => response.json())
    .then(json => {
      dispatch(
        cb.call(
          this,
          json,
          coin
        )
      );
    });
  }
}

export function walletPassphrase(_passphrase) {
  const payload = {
    userpass: `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
    agent: 'bitcoinrpc',
    method: 'walletpassphrase',
    password: _passphrase,
    timeout: '300000',
  };

  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'walletPassphrase',
          'Error',
          'error'
        )
      );
    })
    .then(json => {
    })
  }
}

export function iguanaWalletPassphrase(_passphrase) {
  const _payload = {
    userpass: `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
    handle: '',
    password: _passphrase,
    timeout: '2592000',
    agent: 'bitcoinrpc',
    method: 'walletpassphrase',
  };

  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
      method: 'POST',
      body: JSON.stringify(_payload),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'Error iguanaWalletPassphrase',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(iguanaWalletPassphraseState(json, dispatch));
    });
  }
}

export function iguanaActiveHandle(getMainAddress) {
  const _payload = {
    userpass: `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
    agent: 'SuperNET',
    method: 'activehandle',
  };

  return dispatch => {
    let _fetchConfig = {
      method: 'POST',
      body: JSON.stringify(_payload),
    };

    if (Config.iguanaLessMode) {
      _fetchConfig = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    return fetch(
      Config.iguanaLessMode ? `http://127.0.0.1:${Config.agamaPort}/shepherd/SuperNET/activehandle` : `http://127.0.0.1:${Config.iguanaCorePort}`,
      _fetchConfig
    )
    .catch((error) => {
      console.log(error);
      dispatch(updateErrosStack('activeHandle'));
      dispatch(
        triggerToaster(
          translate('TOASTR.IGUANA_ARE_YOU_SURE'),
          translate('TOASTR.SERVICE_NOTIFICATION'),
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      if (!Config.iguanaLessMode &&
          sessionStorage.getItem('IguanaActiveAccount') &&
          JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey === json.pubkey &&
          json.status === 'unlocked') {
        sessionStorage.setItem('IguanaActiveAccount', JSON.stringify(json));
      }
      dispatch(getMainAddress ? getMainAddressState(json) : iguanaActiveHandleState(json));
    });
  }
}

export function iguanaWalletPassphraseState(json, dispatch, skipToastr) {
  sessionStorage.setItem('IguanaActiveAccount', JSON.stringify(json));

  if (!skipToastr) {
    dispatch(
      triggerToaster(
        translate('TOASTR.LOGIN_SUCCESSFULL'),
        translate('TOASTR.ACCOUNT_NOTIFICATION'),
        'success'
      )
    );
  }
  dispatch(getMainAddressState(json));
  dispatch(iguanaActiveHandleState(json));

  return {
    type: LOGIN,
    isLoggedIn: json && json.pubkey ? true : false,
  }
}

function iguanaActiveHandleState(json) {
  return {
    type: ACTIVE_HANDLE,
    isLoggedIn: sessionStorage.getItem('IguanaActiveAccount') && JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey === json.pubkey && json.status === 'unlocked' ? true : false,
    handle: json,
  }
}