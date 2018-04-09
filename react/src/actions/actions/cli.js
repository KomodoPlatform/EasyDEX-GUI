import { triggerToaster } from '../actionCreators';
import { CLI } from '../storeType';
import Config from '../../config';
import Store from '../../store';

export const shepherdCliPromise = (mode, chain, cmd, params) => {
  let _payload = {
    mode,
    chain,
    cmd,
    token: Config.token,
  };

  if (params) {
    _payload.params = params;
  }

  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/cli`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: _payload }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdCli',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json));
  });
}

export const shepherdCli = (mode, chain, cmd) => {
  const _payload = {
    mode,
    chain,
    cmd,
    token: Config.token,
  };

  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/cli`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': _payload }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdCli',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => dispatch(cliResponseState(json)));
  }
}

export const cliResponseState = (json) => {
  return {
    type: CLI,
    data: json,
  }
}