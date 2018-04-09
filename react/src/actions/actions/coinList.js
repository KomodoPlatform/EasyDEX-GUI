import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';
import translate from '../../translate/translate';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

export const shepherdElectrumLock = () => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/lock`,
      fetchType(JSON.stringify({ token: Config.token })).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumLock',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export const shepherdElectrumLogout = () => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/logout`,
      fetchType(JSON.stringify({ token: Config.token })).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumLogout',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export const shepherdStopCoind = (coin) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/coind/stop`,
      fetchType(coin === 'KMD' ? JSON.stringify({ token: Config.token }) : JSON.stringify({ chain: coin, token: Config.token })).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdStopCoind',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export const shepherdRemoveCoin = (coin, mode) => {
  return new Promise((resolve, reject, dispatch) => {
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/coins/remove`,
      fetchType(
        JSON.stringify(coin === 'KMD' && mode === 'native' ? {
          mode,
          token: Config.token,
        } : {
          mode,
          chain: coin,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdRemoveCoin',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json);
      if (mode === 'native') {
        Store.dispatch(
          triggerToaster(
            `${coin} ${translate('API.DAEMON_IS_STILL_RUNNING')}`,
            'Warning',
            'warning'
          )
        );
      }
    });
  });
}

export const shepherdGetCoinList = () => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/coinslist${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdGetCoinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export const shepherdPostCoinList = (data) => {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/coinslist`,
      fetchType(
        JSON.stringify({
          payload: data,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdPostCoinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export const shepherdClearCoindFolder = (coin, keepWalletDat) => {
  return new Promise((resolve, reject) => {
    const _urlParams1 = {
      token: Config.token,
      coin,
      keepwallet: true,
    };
    const _urlParams2 = {
      token: Config.token,
      coin,
    };
    fetch(
      keepWalletDat ? `http://127.0.0.1:${Config.agamaPort}/shepherd/kick${urlParams(_urlParams1)}` : `http://127.0.0.1:${Config.agamaPort}/shepherd/kick${urlParams(_urlParams2)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdClearCoindFolder',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}