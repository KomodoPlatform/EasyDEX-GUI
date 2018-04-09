import Config from '../../config';
import {
  getDecryptedPassphrase,
  getPinList,
  triggerToaster
} from '../actionCreators';
import { iguanaWalletPassphrase } from './walletAuth';
import translate from '../../translate/translate';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

export const encryptPassphrase = (passphrase, key, pubKey) => {
  const payload = {
    string: passphrase,
    key: key,
    pubkey: pubKey,
    token: Config.token,
  };

  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/encryptkey`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'encryptKey',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        triggerToaster(
          translate('INDEX.PASSPHRASE_SUCCESSFULLY_ENCRYPTED'),
          translate('KMD_NATIVE.SUCCESS'),
          'success'
        )
      );
    });
  }
}

export const loginWithPin = (key, pubKey) => {
  const payload = {
    key: key,
    pubkey: pubKey,
    token: Config.token,
  };

  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/decryptkey`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'decryptKey',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(iguanaWalletPassphrase(json.result));
    });
  }
}

export const loadPinList = () => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/getpinlist${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getPinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        triggerToaster(
          'getPinList',
          'Success',
          'success'
        )
      );
      dispatch(
        getPinList(json.result)
      );
    });
  }
}