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

class ToolsGetUtxos extends React.Component {
  constructor() {
    super();
    this.state = {
      utxoAddr: '',
      utxoCoin: '',
      utxoResult: null,
    };
    this.updateInput = this.updateInput.bind(this);
    this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
    this.getUtxos = this.getUtxos.bind(this);
  }

  getUtxos() {
    const _coin = this.state.utxoCoin.split('|');

    shepherdElectrumListunspent(_coin[0], this.state.utxoAddr)
    .then((res) => {
      if (res.msg === 'success') {
        this.setState({
          utxoResult: res.result,
        });
      } else {
        Store.dispatch(
          triggerToaster(
            res.result,
            'Get UTXO error',
            'error'
          )
        );
      }
    });
  }

  renderUTXOResponse() {
    const _utxos = this.state.utxoResult;
    const _coin = this.state.utxoCoin.split('|');
    let _items = [];

    if (_utxos &&
        _utxos.length) {
      for (let i = 0; i < _utxos.length; i++) {
        _items.push(
          <tr key={ `tools-utxos-${i}` }>
            <td>{ _utxos[i].amount }</td>
            <td>{ _utxos[i].confirmations }</td>
            <td>{ _utxos[i].vout }</td>
            { _coin[0] === 'KMD' &&
              <td>{ _utxos[i].locktime }</td>
            }
            <td>{ _utxos[i].txid }</td>
          </tr>
        );
      }
    }

    return (
      <table className="table table-hover dataTable table-striped">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Confirmations</th>
            <th>Vout</th>
            { _coin[0] === 'KMD' &&
              <th>Locktime</th>
            }
            <th>TxID</th>
          </tr>
        </thead>
        <tbody>
        { _items }
        </tbody>
        <tfoot>
          <tr>
            <th>Amount</th>
            <th>Confirmations</th>
            <th>Vout</th>
            { _coin[0] === 'KMD' &&
              <th>Locktime</th>
            }
            <th>TxID</th>
          </tr>
        </tfoot>
      </table>
    );
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
          <h4>Get UTXO list</h4>
        </div>
        <div className="col-xlg-12 form-group form-material no-padding-left padding-top-20 padding-bottom-70">
          <label
            className="control-label col-sm-1 no-padding-left"
            htmlFor="kmdWalletSendTo">Coin</label>
          <Select
            name="utxoCoin"
            className="col-sm-3"
            value={ this.state.utxoCoin }
            onChange={ (event) => this.updateSelectedCoin(event, 'utxoCoin') }
            optionRenderer={ this.renderCoinOption }
            valueRenderer={ this.renderCoinOption }
            options={ addCoinOptionsCrypto().concat(addCoinOptionsAC()) } />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left">
          <label
            className="control-label col-sm-1 no-padding-left"
            htmlFor="kmdWalletSendTo">Address</label>
          <input
            type="text"
            className="form-control col-sm-3"
            name="utxoAddr"
            onChange={ this.updateInput }
            value={ this.state.utxoAddr }
            placeholder={ translate('SEND.ENTER_ADDRESS') }
            autoComplete="off"
            required />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left margin-top-10 padding-bottom-10">
          <button
            type="button"
            className="btn btn-info col-sm-2"
            onClick={ this.getUtxos }>
              Get UTXO(s)
          </button>
        </div>
        { this.state.utxoResult &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            { this.renderUTXOResponse() }
          </div>
        }
      </div>
    );
  }
}

export default ToolsGetUtxos;