import { ACTIVE_HANDLE } from '../storeType';
import { translate } from '../../translate/translate';
import Config from '../../config';
import {
  triggerToaster,
  toggleAddcoinModal,
  getDexCoins,
  shepherdElectrumCoins,
} from '../actionCreators';
import {
  startCurrencyAssetChain,
  startAssetChain,
  startCrypto,
  checkCoinType,
  checkAC,
} from '../../components/addcoin/payload';

function iguanaActiveHandleState(json) {
  return {
    type: ACTIVE_HANDLE,
    isLoggedIn: json.status === 'unlocked' ? true : false,
    handle: json,
  }
}

export function activeHandle() {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/auth/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'activeHandle',
          'Error',
          'error'
        )
      )
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        iguanaActiveHandleState(json)
      );
    });
  }
}

export function shepherdElectrumAuth(seed) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seed,
        iguana: true,
      }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumAuth',
          'Error',
          'error'
        )
      )
    })
    .then(response => response.json())
    .then(json => {
      dispatch(activeHandle());
      dispatch(shepherdElectrumCoins());
    });
  }
}

export function shepherdElectrumAddCoin(coin) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/coins/add?coin=${coin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumAddCoin',
          'Error',
          'error'
        )
      )
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        addCoinResult(coin, '0')
      );
    });
  }
}

export function addCoin(coin, mode, startupParams) {
  if (mode === 0 ||
      mode === '0') {
    return dispatch => {
      dispatch(shepherdElectrumAddCoin(coin));
    }
  } else {
    return dispatch => {
      dispatch(shepherdGetConfig(coin, '-1', startupParams));
    }
  }
}

function handleErrors(response) {
  let _parsedResponse;

  if (!response.ok) {
    return null;
  } else {
    _parsedResponse = response.text().then((text) => { return text; });
    return _parsedResponse;
  }
}

export function shepherdHerd(coin, mode, path, startupParams) {
  let acData;
  let herdData = {
    'ac_name': coin,
    'ac_options': [
      '-daemon=0',
      '-server',
      `-ac_name=${coin}`,
      '-addnode=78.47.196.146',
    ]
  };

  if (coin === 'ZEC') {
    herdData = {
      'ac_name': 'zcashd',
      'ac_options': [
        '-daemon=0',
        '-server=1',
      ]
    };
  }

  if (coin === 'KMD') {
    herdData = {
      'ac_name': 'komodod',
      'ac_options': [
        '-daemon=0',
        '-addnode=78.47.196.146',
      ]
    };
  }

  if (startupParams) {
    herdData['ac_custom_param'] = startupParams.type;

    if (startupParams.value) {
      herdData['ac_custom_param_value'] = startupParams.value;
    }
  }

  // TODO: switch statement
  if (checkCoinType(coin) === 'crypto') {
    acData = startCrypto(
      path.result,
      coin,
      mode
    );
  }

  if (checkCoinType(coin) === 'currency_ac') {
    acData = startCurrencyAssetChain(
      path.result,
      coin,
      mode
    );
  }

  if (checkCoinType(coin) === 'ac') {
    const supply = startAssetChain(
      path.result,
      coin,
      mode,
      true
    );
    acData = startAssetChain(
      path.result,
      coin,
      mode
    );
    herdData.ac_options.push(`-ac_supply=${supply}`);
  }

  return dispatch => {
    let _herd;

    if (coin === 'CHIPS') {
      _herd = 'chipsd';
      herdData = {};
    } else {
      _herd = coin !== 'ZEC' ? 'komodod' : 'zcashd';
    }

    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/herd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        herd: _herd,
        options: herdData,
      }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          translate('FAILED_SHEPHERD_HERD'),
          translate('TOASTR.SERVICE_NOTIFICATION'),
          'error'
        )
      );
    })
    .then(handleErrors)
    .then((json) => {
      if (json) {
        dispatch(
          addCoinResult(coin, mode)
        );
      } else {
        dispatch(
          triggerToaster(
            translate('TOASTR.ERROR_STARTING_DAEMON', coin) + ' ' + translate('TOASTR.PORT_IS_TAKEN', acData),
            translate('TOASTR.SERVICE_NOTIFICATION'),
            'error',
            false
          )
        );
      }
    });
  }
}

export function addCoinResult(coin, mode) {
  const modeToValue = {
    '0': 'spv',
    '-1': 'native',
  };

  return dispatch => {
    dispatch(
      triggerToaster(
        `${coin} ${translate('TOASTR.STARTED_IN')} ${modeToValue[mode].toUpperCase()} ${translate('TOASTR.MODE')}`,
        translate('TOASTR.COIN_NOTIFICATION'),
        'success'
      )
    );
    dispatch(toggleAddcoinModal(false, false));
    if (Number(mode) === 0) {
      dispatch(activeHandle());
      dispatch(shepherdElectrumCoins());
       dispatch(getDexCoins());

      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 500);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 1000);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 2000);
    } else {
      dispatch(activeHandle());
      dispatch(getDexCoins());

      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 500);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 1000);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 5000);
    }
  }
}

export function _shepherdGetConfig(coin, mode, startupParams) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/getconf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chain: 'komodod' })
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          '_shepherdGetConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(
      json => dispatch(
        shepherdHerd(
          coin,
          mode,
          json,
          startupParams
        )
      )
    );
  }
}

export function shepherdGetConfig(coin, mode, startupParams) {
  if (coin === 'KMD' &&
      mode === '-1') {
    return dispatch => {
      return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/getconf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chain: 'komodod' })
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          triggerToaster(
            'shepherdGetConfig',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(
        json => dispatch(
          shepherdHerd(
            coin,
            mode,
            json,
            startupParams
          )
        )
      )
    }
  } else {
    return dispatch => {
      return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/getconf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'chain': coin })
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          triggerToaster(
            'shepherdGetConfig',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(
        json => dispatch(
          shepherdHerd(
            coin,
            mode,
            json,
            startupParams
          )
        )
      );
    }
  }
}