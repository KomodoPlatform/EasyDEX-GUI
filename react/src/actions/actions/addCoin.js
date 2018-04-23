import { ACTIVE_HANDLE } from '../storeType';
import translate from '../../translate/translate';
import Config from '../../config';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

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
  checkAC,
} from '../../components/addcoin/payload';

export const iguanaActiveHandleState = (json) => {
  return {
    type: ACTIVE_HANDLE,
    isLoggedIn: json.status === 'unlocked' ? true : false,
    handle: json,
  }
}

export const activeHandle = () => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/auth/status${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'activeHandle',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        iguanaActiveHandleState(json)
      );
    });
  }
}

export const shepherdElectrumAuth = (seed) => {
  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/login`,
      fetchType(
        JSON.stringify({
          seed,
          iguana: true,
          token: Config.token,
        })
      ).post
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumAuth',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      if (json.msg !== 'error') {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
      } else {
        dispatch(
          triggerToaster(
            translate('TOASTR.INCORRECT_WIF'),
            'Error',
            'error'
          )
        );
      }
    });
  }
}

export const shepherdElectrumAddCoin = (coin) => {
  return dispatch => {
    const _urlParams = {
      coin,
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/electrum/coins/add${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumAddCoin',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        addCoinResult(coin, '0')
      );
    });
  }
}

export const addCoin = (coin, mode, startupParams) => {
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

const handleErrors = (response) => {
  let _parsedResponse;

  if (!response.ok) {
    return null;
  } else {
    _parsedResponse = response.text().then((text) => { return text; });
    return _parsedResponse;
  }
}

export const shepherdHerd = (coin, mode, path, startupParams) => {
  let acData;
  let herdData = {
    'ac_name': coin,
    'ac_options': [
      '-daemon=0',
      '-server',
      `-ac_name=${coin}`,
      '-addnode=78.47.196.146',
    ],
  };

  if (coin === 'BEER' ||
      coin === 'PIZZA') {
    herdData['ac_options'].pop();
    herdData['ac_options'].push('-addnode=24.54.206.138');
  } else if (coin === 'NINJA') {
    herdData['ac_options'].pop();
    herdData['ac_options'].push('-addnode=192.241.134.19');
  } else if (coin === 'OOT') {
    herdData['ac_options'].pop();
    herdData['ac_options'].push('-addnode=174.138.107.226');
  } else if (coin === 'BNTN') {
    herdData['ac_options'].pop();
    herdData['ac_options'].push('-addnode=94.130.169.205');
  } else if (coin === 'EQL') {
    herdData['ac_options'].pop();
    herdData['ac_options'].push('-addnode=46.101.124.153');  
  } else if (coin === 'GLXT') {
    herdData['ac_options'].pop();
    herdData['ac_options'].push('-addnode=34.201.62.8');  

}


  if (coin === 'ZEC') {
    herdData = {
      'ac_name': 'zcashd',
      'ac_options': [
        '-daemon=0',
        '-server=1',
      ],
    };
  }

  if (coin === 'KMD') {
    herdData = {
      'ac_name': 'komodod',
      'ac_options': [
        '-daemon=0',
        '-addnode=78.47.196.146',
      ],
    };
  }

  if (startupParams) {
    herdData['ac_custom_param'] = startupParams.type;

    if (startupParams.value) {
      herdData['ac_custom_param_value'] = startupParams.value;
    }
  }

  // TODO: switch statement
  if (coin === 'KMD') {
    acData = startCrypto(
      path.result,
      coin,
      mode
    );
  } else {
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

    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/herd`,
      fetchType(
        JSON.stringify({
          herd: _herd,
          options: herdData,
          token: Config.token,
        })
      ).post
    )
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
            `${translate('TOASTR.ERROR_STARTING_DAEMON', coin)} ${translate('TOASTR.PORT_IS_TAKEN', acData)}`,
            translate('TOASTR.SERVICE_NOTIFICATION'),
            'error',
            false
          )
        );
      }
    });
  }
}

export const addCoinResult = (coin, mode) => {
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

export const _shepherdGetConfig = (coin, mode, startupParams) => {
  return dispatch => {
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/getconf`,
      fetchType(
        JSON.stringify({
          chain: 'komodod',
          token: Config.token,
        })
      ).post
    )
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

export const shepherdGetConfig = (coin, mode, startupParams) => {
  if (coin === 'KMD' &&
      mode === '-1') {
    return dispatch => {
      return fetch(
        `http://127.0.0.1:${Config.agamaPort}/shepherd/getconf`,
        fetchType(
          JSON.stringify({
            chain: 'komodod',
            token: Config.token,
          })
        ).post
      )
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
  } else {
    return dispatch => {
      return fetch(
        `http://127.0.0.1:${Config.agamaPort}/shepherd/getconf`,
        fetchType(
          JSON.stringify({
            chain: coin,
            token: Config.token,
          })
        ).post
      )
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
