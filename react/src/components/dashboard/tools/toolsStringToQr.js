import React from 'react';
import translate from '../../../translate/translate';
import addCoinOptionsCrypto from '../../addcoin/addcoinOptionsCrypto';
import addCoinOptionsAC from '../../addcoin/addcoinOptionsAC';
import Select from 'react-select';
import {
  triggerToaster,
  shepherdToolsBalance,
  shepherdToolsBuildUnsigned,
  shepherdToolsPushTx,
  shepherdToolsSeedToWif,
  shepherdToolsWifToKP,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import QRCode from 'qrcode.react';
import QRModal from '../qrModal/qrModal';

class ToolsStringToQr extends React.Component {
  constructor() {
    super();
    this.state = {
      string2qr: '',
    };
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="row margin-left-10">
        <div className="col-xlg-12 form-group form-material no-padding-left padding-bottom-10">
          <h4>String to QR</h4>
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left">
          <input
            type="text"
            className="form-control col-sm-5"
            name="string2qr"
            value={ this.state.string2qr }
            onChange={ this.updateInput }
            placeholder="Type a string here"
            autoComplete="off" />
        </div>
        { this.state.string2qr &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-50 center">
            <QRCode
              value={ this.state.string2qr }
              size={ 320 } />
          </div>
        }
      </div>
    );
  }
}

export default ToolsStringToQr;