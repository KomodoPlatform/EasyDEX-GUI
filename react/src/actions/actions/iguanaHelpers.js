import {
  logGuiHttp,
  guiLogState
} from './log';
import Config from '../../config';
import { checkAC } from '../../components/addcoin/payload';

export function getPassthruAgent(coin) {
  let passthruAgent;

  if (coin === 'KMD') { passthruAgent = 'komodo'; };
  if (coin === 'ZEC') { passthruAgent = 'zcash'; };

  if (checkAC(coin)) { passthruAgent = 'iguana'; };

  return passthruAgent;
}

export function iguanaHashHex(data, dispatch) {
  const payload = {
    userpass: `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
    agent: 'hash',
    method: 'hex',
    message: data,
  };

  return new Promise((resolve, reject) => {
    // skip iguana hashing in cli mode
    if (Config.cli.default) {
      resolve(true);
    } else {
      const _timestamp = Date.now();
      if (Config.debug) {
        dispatch(logGuiHttp({
          timestamp: _timestamp,
          function: 'iguanaHashHex',
          type: 'post',
          url: `http://127.0.0.1:${Config.iguanaCorePort}`,
          payload: payload,
          status: 'pending',
        }));
      }

      fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      .catch(function(error) {
        console.log(error);
        if (Config.debug) {
          dispatch(logGuiHttp({
            timestamp: _timestamp,
            status: 'error',
            response: error,
          }));
        }
        dispatch(
          triggerToaster(
            'iguanaHashHex',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(json => {
        if (Config.debug) {
          dispatch(logGuiHttp({
            timestamp: _timestamp,
            status: 'success',
            response: json,
          }));
        }
        resolve(json.hex);
      })
    }
  })
}

