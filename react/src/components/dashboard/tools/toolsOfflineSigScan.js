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
  shepherdElectrumListunspent,
  shepherdCliPromise,
  shepherdElectrumSplitUtxoPromise,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import QRCode from 'qrcode.react';
import QRModal from '../qrModal/qrModal';

class ToolsOfflineSigScan extends React.Component {
  constructor() {
    super();
    this.state = {
      sendFrom: '',
      sendTo: '',
      amount: 0,
      selectedCoin: '',
      balance: null,
      tx2qr: null,
      utxo: null,
      rawTx2Push: null,
      txPushResult: null,
    };
    this.updateInput = this.updateInput.bind(this);
    this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
    this.sendTx = this.sendTx.bind(this);
  }

  sendTx(rawTx2Push) {
    let _txData = rawTx2Push.split(':');

    // console.warn(_txData);

    shepherdToolsPushTx(_txData[0], _txData[1])
    .then((res) => {
      // console.warn(res);

      this.setState({
        txPushResult: res.result,
        rawTx2Push,
      });
    });
  }

  renderCoinOption(option) {
    return (
      <div>
        <img
          src={ `assets/images/cryptologo/${option.icon.toLowerCase()}.png` }
          alt={ option.label }
          width="30px"
          height="30px" />
        <span className="margin-left-10">{ option.label }</span>
      </div>
    );
  }

  updateSelectedCoin(e, propName) {
    if (e &&
        e.value &&
        e.value.indexOf('|')) {
      this.setState({
        [propName]: e.value,
      });
    }
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
          <h4>Push QR transaction</h4>
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left">
          <QRModal
            mode="scan"
            setRecieverFromScan={ this.sendTx } />
        </div>
        { this.state.rawTx2Push &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-20">
            <textarea
              rows="5"
              cols="20"
              className="col-sm-7 no-padding-left"
              value={ this.state.rawTx2Push }></textarea>
          </div>
        }
        { this.state.txPushResult &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-20">
            { this.state.txPushResult.length === 64 &&
              <div>
                <div className="margin-bottom-15">
                  { this.state.rawTx2Push.split(':')[0].toUpperCase() } transaction pushed!
                </div>
                <div>TxID { this.state.txPushResult }</div>
              </div>
            }
            { this.state.txPushResult.length !== 64 &&
              <div>Error: { this.state.txPushResult }</div>
            }
          </div>
        }
      </div>
    );
  }
}

export default ToolsOfflineSigScan;