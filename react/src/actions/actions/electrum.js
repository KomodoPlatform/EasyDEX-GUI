import {
  DASHBOARD_ELECTRUM_BALANCE,
  DASHBOARD_ELECTRUM_TRANSACTIONS,
  DASHBOARD_ELECTRUM_COINS,
} from '../storeType';
import translate from '../../translate/translate';
import Config from '../../config';
import {
  triggerToaster,
  sendToAddressState,
} from '../actionCreators';
import Store from '../../store';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

// TODO: dev display errors

// src: atomicexplorer
export const shepherdGetRemoteBTCFees = () => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.atomicexplorer.com/api/btc/fees`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      /*Store.dispatch(
        triggerToaster(
          'shepherdGetRemoteBTCFees',
          'Error',
          'error'
        )
      );*/
      resolve({ msg: 'error' });
    })
    .then(response => response.json())
    .then(json => {
      resolve(json);
    });
  });
}

// btc fees fallback
export const shepherdGetLocalBTCFees = () => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/btcfees${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdGetLocalBTCFees',
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

export const shepherdElectrumSetServer = (coin, address, port) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      address,
      port,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/coins/server/set${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumSetServer',
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

export const shepherdElectrumCheckServerConnection = (address, port) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      address,
      port,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/servers/test${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumCheckServerConnection',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export const shepherdElectrumKeys = (seed) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/keys`,
      fetchType(
        JSON.stringify({
          seed,
          active: true,
          iguana: true,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumKeys',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export const shepherdElectrumBalance = (coin, address) => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
      address,
      coin,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/getbalance${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumBalance',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(shepherdElectrumBalanceState(json));
    });
  }
}

export const shepherdElectrumBalanceState = (json) => {
  return {
    type: DASHBOARD_ELECTRUM_BALANCE,
    balance: json.result,
  }
}

export const shepherdElectrumTransactions = (coin, address) => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
      address,
      coin,
      full: true,
      maxlength: 20,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/listtransactions${urlParams(_urlParams)}`,
      fetchType.get  
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumTransactions',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(shepherdElectrumTransactionsState(json));
    });
  }
}

export const shepherdElectrumTransactionsState= (json) => {
  json = json.result;

  if (json &&
      json.error) {
    json = null;
  } else if (!json || !json.length) {
    json = 'no data';
  }

  return {
    type: DASHBOARD_ELECTRUM_TRANSACTIONS,
    txhistory: json,
  }
}

export const shepherdElectrumCoins = () => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/coins${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumCoins',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(shepherdElectrumCoinsState(json));
    });
  }
}

export const shepherdElectrumCoinsState = (json) => {
  return {
    type: DASHBOARD_ELECTRUM_COINS,
    electrumCoins: json.result,
  }
}

// value in sats
export const shepherdElectrumSend = (coin, value, sendToAddress, changeAddress, btcFee) => {
  value = Math.floor(value);

  return dispatch => {
    const _urlParams = {
      token: Config.token,
      coin,
      value,
      address: sendToAddress,
      change: changeAddress,
      gui: true,
      push: true,
      verify: true,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/createrawtx${urlParams(_urlParams)}${btcFee ? '&btcfee=' + btcFee : ''}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumSend',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(sendToAddressState(json.msg === 'error' ? json : json.result));
    });
  }
}

export const shepherdElectrumSendPromise = (coin, value, sendToAddress, changeAddress, btcFee) => {
  value = Math.floor(value);

  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      value,
      address: sendToAddress,
      change: changeAddress,
      gui: true,
      verify: true,
      push: true,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/createrawtx${urlParams(_urlParams)}${btcFee ? '&btcfee=' + btcFee : ''}`,
      fetchType.get  
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumSendPromise',
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

export const shepherdElectrumSendPreflight = (coin, value, sendToAddress, changeAddress, btcFee) => {
  value = Math.floor(value);

  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      value,
      address: sendToAddress,
      change: changeAddress,
      gui: true,
      verify: true,
      push: false,
    };  
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/createrawtx${urlParams(_urlParams)}${btcFee ? '&btcfee=' + btcFee : ''}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumSendPreflight',
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

export const shepherdElectrumListunspent = (coin, address) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      address,
      full: true,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/listunspent${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumListunspent',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(!json.result ? 'error' : json);
    });
  });
}

export const shepherdElectrumBip39Keys = (seed, match, addressdepth, accounts) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/seed/bip39/match`,
      fetchType(
        JSON.stringify({
          seed,
          match,
          addressdepth,
          accounts,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumSetServer',
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

// split utxo
export const shepherdElectrumSplitUtxoPromise = (payload) => {
  console.warn('shepherdElectrumSplitUtxoPromise', payload);

  return new Promise((resolve, reject) => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/createrawtx-split`,
      fetchType(
        JSON.stringify({
          payload,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumSendPromise',
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