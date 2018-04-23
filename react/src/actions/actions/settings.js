import {
  LOAD_APP_INFO,
  GET_WIF_KEY,
  GET_DEBUG_LOG,
  GET_PEERS_LIST,
  LOAD_APP_CONFIG,
} from '../storeType';
import translate from '../../translate/translate';
import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

const getAppInfoState = (json) => {
  return {
    type: LOAD_APP_INFO,
    info: json,
  }
}

export const getAppInfo = () => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/appinfo${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getAppInfo',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => dispatch(getAppInfoState(json)));
  }
}

export const settingsWifkeyState = (json, coin) => {
  return {
    type: GET_WIF_KEY,
    wifkey: json,
    address: json[coin],
  }
}

const parseImportPrivKeyResponse = (json, dispatch) => {
  if (json.error === 'illegal privkey') {
    return dispatch => {
      dispatch(
        triggerToaster(
          translate('API.ILLEGAL_PRIVKEY'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'error'
        )
      );
    }
  } else if (json.error === 'privkey already in wallet') {
    return dispatch => {
      dispatch(
        triggerToaster(
          translate('API.PRIVKEY_IN_WALLET'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'warning'
        )
      );
    }
  }

  if (json &&
      json.result !== undefined &&
      json.result == 'success') {
    return dispatch => {
      dispatch(
        triggerToaster(
          translate('TOASTR.PRIV_KEY_IMPORTED'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'success'
        )
      );
    }
  }
}

const getDebugLogState = (json) => {
  const _data = json.result.replace('\n', '\r\n');

  return {
    type: GET_DEBUG_LOG,
    data: _data,
  }
}

export const getDebugLog = (target, linesCount, acName) => {
  let payload = {
    herdname: target,
    lastLines: linesCount,
    token: Config.token,
  };

  if (acName) {
    payload.ac = acName;
  }

  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/debuglog`,
      fetchType(JSON.stringify(payload))
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getDebugLog',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => dispatch(getDebugLogState(json)));
  }
}

export const saveAppConfig = (_payload) => {
  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/appconf`,
      fetchType(
        JSON.stringify({
          payload: _payload,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'saveAppConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(getAppConfig());
      dispatch(
        triggerToaster(
          translate('TOASTR.SETTINGS_SAVED'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'success'
        )
      );
    });
  }
}

const getAppConfigState = (json) => {
  return {
    type: LOAD_APP_CONFIG,
    config: json,
  }
}

export function getAppConfig() {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/appconf${urlParams(_urlParams)}`,
      fetchType.get  
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getAppConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => dispatch(getAppConfigState(json)));
  }
}

export const resetAppConfig = () => {
  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/appconf/reset`,
      fetchType(JSON.stringify({ token: Config.token })).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'resetAppConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(getAppConfig());
      dispatch(
        triggerToaster(
          translate('TOASTR.SETTINGS_RESET'),
          translate('TOASTR.SETTINGS_NOTIFICATION'),
          'success'
        )
      );
    });
  }
}

export const coindGetStdout = (chain) => {
  const _chain = chain === 'KMD' ? 'komodod' : chain;

  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      chain,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/coind/stdout${urlParams(_urlParams)}`,
      fetchType.get  
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'coindGetStdout',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json);
    });
  });
}

export const getWalletDatKeys = (chain, keyMatchPattern) => {
  const _chain = chain === 'KMD' ? null : chain;

  return new Promise((resolve, reject) => {
    const _urlParams1 = {
      token: Config.token,
      chain,
      search: keyMatchPattern,
    };
    const _urlParams2 = {
      token: Config.token,
      chain,
    };
    fetch(
      keyMatchPattern ? `http://127.0.0.1:${Config.agamaPort}/shepherd/coindwalletkeys${urlParams(_urlParams1)}` : `http://127.0.0.1:${Config.agamaPort}/shepherd/coindwalletkeys${urlParams(_urlParams2)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'getWalletDatKeys',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json);
    });
  });
}

export const dumpPrivKey = (coin, address, isZaddr) => {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: isZaddr ? 'z_exportkey' : 'dumpprivkey',
      params: [ address ],
      rpc2cli: Config.rpc2cli,
      token: Config.token,
    };

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`,
      fetchType(JSON.stringify({ payload })).post
    )
    .catch(function(error) {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'dumpPrivKey',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json.result ? json.result : json);
    });
  });
}

export const validateAddress = (coin, address, isZaddr) => {
  return new Promise((resolve, reject) => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: isZaddr ? 'z_validateaddress' : 'validateaddress',
      params: [ address ],
      rpc2cli: Config.rpc2cli,
      token: Config.token,
    };

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`,
      fetchType(JSON.stringify({ payload })).post
    )
    .catch(function(error) {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'validateAddress',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json.result ? json.result : json);
    });
  });
}