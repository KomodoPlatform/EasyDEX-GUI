import {
  DASHBOARD_ACTIVE_COIN_NET_PEERS,
  DASHBOARD_ACTIVE_COIN_NET_TOTALS,
} from '../storeType';
import { translate } from '../../translate/translate';
import { triggerToaster } from '../actionCreators';
import Config from '../../config';

export function getNativePeers(coin) {
  return dispatch => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'getpeerinfo',
    };

    const _fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: payload }),
    };

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`,
      _fetchConfig
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getNativePeers',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      json = json.result;
      dispatch(getNativePeersState(json));
    })
  };
}

export function getNativeNettotals(coin) {
  return dispatch => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'getnettotals',
    };

    const _fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: payload }),
    };

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`,
      _fetchConfig
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getNativeNettotals',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      json = json.result;
      dispatch(getNativeNettotalsState(json));
    })
  };
}

export function getNativePeersState(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_NET_PEERS,
    peers: json,
  }
}

export function getNativeNettotalsState(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_NET_TOTALS,
    totals: json,
  }
}