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

class ToolsSeedToWif extends React.Component {
  constructor() {
    super();
    this.state = {
      s2wSeed: '',
      s2wCoin: '',
      s2wisIguana: true,
      s2wResult: null,
    };
    this.updateInput = this.updateInput.bind(this);
    this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
    this.seed2Wif = this.seed2Wif.bind(this);
    this.toggleS2wIsIguana = this.toggleS2wIsIguana.bind(this);
  }

  seed2Wif() {
    const _coin = this.state.s2wCoin.split('|');

    shepherdToolsSeedToWif(
      this.state.s2wSeed,
      _coin[0],
      this.state.s2wisIguana
    )
    .then((res) => {
      // console.warn(res);

      if (res.msg === 'success') {
        this.setState({
          s2wResult: res.result,
        });
      } else {
        Store.dispatch(
          triggerToaster(
            res.result,
            'Seed to wif error',
            'error'
          )
        );
      }
    });
  }

  toggleS2wIsIguana() {
    this.setState({
      s2wisIguana: !this.state.s2wisIguana,
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
          <h4>Seed to key pair (wif, pub)</h4>
        </div>
        <div className="col-xlg-12 form-group form-material no-padding-left padding-top-20 padding-bottom-70">
          <label
            className="control-label col-sm-1 no-padding-left"
            htmlFor="kmdWalletSendTo">Coin</label>
          <Select
            name="s2wCoin"
            className="col-sm-3"
            value={ this.state.s2wCoin }
            onChange={ (event) => this.updateSelectedCoin(event, 's2wCoin') }
            optionRenderer={ this.renderCoinOption }
            valueRenderer={ this.renderCoinOption }
            options={ addCoinOptionsCrypto().concat(addCoinOptionsAC()) } />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left">
          <label
            className="control-label col-sm-1 no-padding-left"
            htmlFor="kmdWalletSendTo">Passphrase</label>
          <input
            type="text"
            className="form-control col-sm-3"
            name="s2wSeed"
            onChange={ this.updateInput }
            value={ this.state.s2wSeed }
            placeholder="Enter a passphrase"
            autoComplete="off"
            required />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={ this.state.s2wisIguana } />
            <div
              className="slider"
              onClick={ this.toggleS2wIsIguana }></div>
          </label>
          <div
            className="toggle-label pointer iguana-core-toggle"
            onClick={ this.toggleS2wIsIguana }>
            Iguana Core compatible
          </div>
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left margin-top-10 padding-bottom-10">
          <button
            type="button"
            className="btn btn-info col-sm-2"
            onClick={ this.seed2Wif }>
              Get WIF
          </button>
        </div>
        { this.state.s2wResult &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            <div>
              <strong>WIF:</strong> { this.state.s2wResult.keys.priv }
            </div>
            <div className="margin-top-10">
              <strong>Pub:</strong> { this.state.s2wResult.keys.pub }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ToolsSeedToWif;