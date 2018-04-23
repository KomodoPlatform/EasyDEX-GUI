import translate from '../../translate/translate';
import Config from '../../config';
import { triggerToaster } from '../actionCreators';
import Store from '../../store';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

export const shepherdElectionsBalance = (coin, address) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      address,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/getbalance${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectionsBalance',
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

export const shepherdElectionsTransactions = (coin, address, type) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      address,
      full: true,
      type,
      maxlength: 20,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/elections/listtransactions${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectionsTransactions',
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

export const shepherdElectionsStatus = () => {
  return new Promise((resolve, reject) => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/elections/status`,
      fetchType(
        JSON.stringify({
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsStatus',
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

export const shepherdElectionsLogin = (seed, network) => {
  return new Promise((resolve, reject) => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/elections/login`,
      fetchType(
        JSON.stringify({
          seed,
          network,
          iguana: true,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsLogin',
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

export const shepherdElectionsLogout = () => {
  return new Promise((resolve, reject) => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/elections/logout`,
      fetchType(
        JSON.stringify({
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsLogout',
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

export const shepherdElectionsSend = (coin, value, sendToAddress, changeAddress, opreturn) => {
  value = Math.floor(value);

  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      coin,
      address,
      value,
      opreturn,
      change: changeAddress,
      vote: true,
      push: true,
      verify: false
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/createrawtx${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsSend',
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

export const shepherdElectionsSendMany = (coin, targets, change, opreturn) => {
  return new Promise((resolve, reject) => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/createrawtx-multiout`,
      fetchType(
        JSON.stringify({
          token: Config.token,
          coin,
          targets,
          change,
          opreturn,
          push: true,
          verify: false,
          vote: true,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectionsSendMany',
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