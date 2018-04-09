import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';

export const shepherdGetSysInfo = () => {
  return dispatch => {
    const _urlParams = {
      token: Config.token,
    };
    return fetch(
      `http://127.0.0.1:${Config.agamaPort}/shepherd/sysinfo${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdGetSysInfo',
          'Error',
          'error'
        )
      )
    })
    .then(response => response.json())
    .then(json => console.log(json));
  }
}