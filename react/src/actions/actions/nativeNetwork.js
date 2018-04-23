import {
  DASHBOARD_ACTIVE_COIN_NET_PEERS,
  DASHBOARD_ACTIVE_COIN_NET_TOTALS,
} from '../storeType';
import translate from '../../translate/translate';
import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import fetchType from '../../util/fetchType';

export const getNativePeers = (coin) => {
  return dispatch => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'getpeerinfo',
      rpc2cli: Config.rpc2cli,
      token: Config.token,
    };

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`,
      fetchType(JSON.stringify({ payload })).post
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
    });
  };
}

export const getNativeNettotals = (coin) => {
  return dispatch => {
    const payload = {
      mode: null,
      chain: coin,
      cmd: 'getnettotals',
      rpc2cli: Config.rpc2cli,
      token: Config.token,
    };

    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/cli`,
      fetchType(JSON.stringify({ payload })).post
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
    });
  };
}

export const getNativePeersState = (json) => {
  return {
    type: DASHBOARD_ACTIVE_COIN_NET_PEERS,
    peers: json,
  }
}

export const getNativeNettotalsState = (json) => {
  return {
    type: DASHBOARD_ACTIVE_COIN_NET_TOTALS,
    totals: json,
  }
}