import copyToClipboard from '../../util/copyToClipboard';
import translate from '../../translate/translate';
import { triggerToaster } from '../actionCreators';

export const copyCoinAddress = (address) => {
  const _result = copyToClipboard(address);

  return dispatch => {
    dispatch(
      triggerToaster(
        translate(_result ? 'DASHBOARD.ADDR_COPIED' : 'API.COULDNT_COPY_ADDRESS'),
        translate('TOASTR.COIN_NOTIFICATION'),
        _result ? 'success' : 'error'
      )
    );
  }
}

export const copyString = (string, message) => {
  const _result = copyToClipboard(string);

  return dispatch => {
    dispatch(
      triggerToaster(
        message,
        translate('TOASTR.COIN_NOTIFICATION'),
        _result ? 'success' : 'error'
      )
    );
  }
}