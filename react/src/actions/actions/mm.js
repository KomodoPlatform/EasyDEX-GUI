import {
  DEX_LOGIN,
  DEX_RESET,
  DEX_ASKS,
  DEX_BIDS,
  DEX_SWAPS,
  DEX_ADD_COIN,
  DEX_REMOVE_COIN,
  DEX_INVENTORY,
  DEX_UTXO,
  DEX_CACHE_PRELOAD,
  DEX_PRICES,
  DEX_STATS,
  DEX_ACTIVE_SECTION,
} from '../storeType';
import translate from '../../translate/translate';
import Config from '../../config';
import { triggerToaster } from '../actionCreators';
import Store from '../../store';

export function shepherdMMCachePreloadState(isAuth, asks, bids, pair, coins, swaps, rates, coinsHelper, electrumServersList) {
  return {
    type: DEX_CACHE_PRELOAD,
    isAuth,
    asks,
    bids,
    pair,
    coins,
    swaps,
    rates,
    coinsHelper,
    electrumServersList,
  }
}

export function shepherdMMResetState() {
  return {
    type: DEX_RESET,
  }
}

export function shepherdMMStart(passphrase) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/mm/start?passphrase=${passphrase}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdMMStart',
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

export function shepherdMMStop() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/mm/stop`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdMMStop',
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

export function shepherdMMRequest(payload) {
  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/mm/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload, }),
      },
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdMMRequest',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      console.warn(json);
      dispatch(shepherdMMRequestState(payload.mapToProp, json));
    });
  }
}

export function shepherdMMRequestState(prop, json) {
  if (prop === 'prices') {
    return {
      type: DEX_PRICES,
      prices: json,
    }
  } else if (prop === 'stats') {
    return {
      type: DEX_STATS,
      stats: json,
    }
  } else if (prop === 'swaps') {
    return {
      type: DEX_SWAPS,
      swaps: json,
    }
  }
}

export function dexActiveSection(section) {
  return {
    type: DEX_ACTIVE_SECTION,
    section,
  }
}