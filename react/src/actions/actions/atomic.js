// spv v2

import { ATOMIC } from '../storeType';
import { triggerToaster } from '../actionCreators';
import Config from '../../config';

export const atomic = (payload) => {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      token: Config.token,
    })
    .catch((error) => {
      console.warn(error);
      dispatch(
        triggerToaster(
          payload.method,
          translate('API.ATOMIC_EXPLORER_ERR'),
          translate('API.ERROR_SM')
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(atomicState(json));
    });
  }
}

const atomicState = (json) => {
  return {
    type: ATOMIC,
    response: json,
  }
}