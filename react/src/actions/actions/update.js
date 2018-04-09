import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

export const checkForUpdateUIPromise = () => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/update/patch/check${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'checkForUpdateUIPromise',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export const updateUIPromise = () => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/update/patch${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'updateUIPromise',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export const downloadZCashParamsPromise = (dloption) => {
  return new Promise((resolve, reject) => {
    const _urlParams = {
      token: Config.token,
      dloption,
    };
    fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/zcparamsdl${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'downloadZCashParamsPromise',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}
