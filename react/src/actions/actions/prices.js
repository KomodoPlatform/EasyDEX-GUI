import { PRICES } from '../storeType';
import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import translate from '../../translate/translate';
import fetchType from '../../util/fetchType';

// TODO: dev display errors

const fiatRates = (pricesJson) => {
  return dispatch => {
    return fetch(
      `https://www.atomicexplorer.com/api/rates/kmd`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      /*dispatch(
        triggerToaster(
          'fiatRates',
          'Error',
          'error'
        )
      );*/
    })
    .then(response => response.json())
    .then(json => {
      let _coins = pricesJson.result;
      _coins.fiat = json.result;

      dispatch(pricesState(_coins));
    });
  }
}

export const prices = () => {
  return dispatch => {
    return fetch(
      `https://www.atomicexplorer.com/api/mm/prices`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      /*dispatch(
        triggerToaster(
          'prices',
          'Error',
          'error'
        )
      );*/
    })
    .then(response => response.json())
    .then(json => {
      dispatch(fiatRates(json));
    });
  }
}

const pricesState = (json) => {
  return {
    type: PRICES,
    prices: json,
  }
}