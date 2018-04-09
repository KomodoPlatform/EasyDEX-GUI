import React from 'react';
import translate from '../../../translate/translate';
import { connect } from 'react-redux';
import {
  shepherdElectrumBip39Keys,
  copyCoinAddress,
  triggerToaster,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import ReactTooltip from 'react-tooltip';

const SEED_TRIM_TIMEOUT = 5000;

class Bip39KeysPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      keys: null,
      match: '',
      passphrase: '',
      seedExtraSpaces: false,
      seedInputVisibility: false,
      trimPassphraseTimer: null,
      addressdepth: 20,
      accounts: 1,
    };
    this._getBip39Keys = this._getBip39Keys.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.toggleSeedInputVisibility = this.toggleSeedInputVisibility.bind(this);
    this._copyCoinAddress = this._copyCoinAddress.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.Dashboard &&
        props.Dashboard.activeSection !== 'settings') {
      // reset input vals
      this.refs.passphrase.value = '';
      this.refs.passphraseTextarea.value = '';

      this.setState(Object.assign({}, this.state, {
        passphrase: '',
        keys: null,
        match: null,
        accounts: 1,
        addressdepth: 20,
        seedInputVisibility: false,
      }));
    }
  }

  toggleSeedInputVisibility() {
    this.setState({
      seedInputVisibility: !this.state.seedInputVisibility,
    });
  }

  updateInput(e) {
    const newValue = e.target.value;

    clearTimeout(this.state.trimPassphraseTimer);

    const _trimPassphraseTimer = setTimeout(() => {
      if (newValue[0] === ' ' ||
          newValue[newValue.length - 1] === ' ') {
        this.setState({
          seedExtraSpaces: true,
        });
      } else {
        this.setState({
          seedExtraSpaces: false,
        });
      }
    }, SEED_TRIM_TIMEOUT);

    if (e.target.name === 'passphrase') {
      this.resizeLoginTextarea();
    }

    this.setState({
      trimPassphraseTimer: _trimPassphraseTimer,
      [e.target.name === 'passphraseTextarea' ? 'passphrase' : e.target.name]: newValue,
    });
  }

  resizeLoginTextarea() {
    // auto-size textarea
    setTimeout(() => {
      if (this.state.seedInputVisibility) {
        document.querySelector('#passphraseTextarea').style.height = '1px';
        document.querySelector('#passphraseTextarea').style.height = `${(15 + document.querySelector('#passphraseTextarea').scrollHeight)}px`;
      }
    }, 100);
  }

  _copyCoinAddress(address) {
    Store.dispatch(copyCoinAddress(address));
  }

  _getBip39Keys() {
    shepherdElectrumBip39Keys(
      this.state.passphrase,
      this.state.match,
      this.state.addressdepth,
      this.state.accounts
    )
    .then((res) => {
      this.setState({
        keys: res.result.priv ? res.result : 'empty',
      });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 padding-bottom-10">
            <h4 className="col-red">
              <i className="fa fa-warning"></i> { translate('SETTINGS.BIP39_DISC') }
            </h4>
            <div>{ translate('SETTINGS.BIP39_DESC_P1') }</div>
            <div>{ translate('SETTINGS.BIP39_DESC_P2') }</div>
            <div className="bip39-search">
              <div className="col-sm-12 no-padding-left margin-top-10">
                <div className="form-group form-material floating">
                  <input
                    type="password"
                    className={ !this.state.seedInputVisibility ? 'form-control' : 'hide' }
                    autoComplete="off"
                    name="passphrase"
                    ref="passphrase"
                    id="passphrase"
                    onChange={ this.updateInput }
                    value={ this.state.passphrase } />
                  <textarea
                    className={ this.state.seedInputVisibility ? 'form-control' : 'hide' }
                    autoComplete="off"
                    id="passphraseTextarea"
                    ref="passphraseTextarea"
                    name="passphraseTextarea"
                    onChange={ this.updateInput }
                    value={ this.state.passphrase }></textarea>
                  <i
                    className={ 'seed-toggle fa fa-eye' + (!this.state.seedInputVisibility ? '-slash' : '') }
                    onClick={ this.toggleSeedInputVisibility }></i>
                  <label
                    className="floating-label"
                    htmlFor="passphrase">{ translate('INDEX.PASSPHRASE') }</label>
                  { this.state.seedExtraSpaces &&
                    <span>
                      <i className="icon fa-warning seed-extra-spaces-warning"
                        data-tip="Your seed contains leading/trailing space characters"
                        data-html={ true }></i>
                      <ReactTooltip
                        effect="solid"
                        className="text-left" />
                    </span>
                  }
                </div>
              </div>
              <div className="col-sm-5 no-padding-left">
                <input
                  type="text"
                  className="form-control margin-top-10"
                  autoComplete="off"
                  name="match"
                  onChange={ this.updateInput }
                  placeholder={ translate('SETTINGS.SEARCH_KEY_PATTERN') }
                  value={ this.state.match } />
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light margin-top-20"
                  disabled={ !this.state.match || !this.state.passphrase || this.state.passphrase.length < 2 }
                  onClick={ this._getBip39Keys }>{ translate('SETTINGS.GET_KEY') }</button>
              </div>
              <div className="col-sm-2 no-padding-left text-center margin-top-10 margin-left-50">
                <select
                  className="form-control form-material"
                  name="accounts"
                  value={ this.state.accounts }
                  onChange={ (event) => this.updateInput(event) }
                  autoFocus>
                  <option value="1">1 { translate('SETTINGS.ACCOUNT_SM') }</option>
                  <option value="2">2 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                  <option value="3">3 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                  <option value="4">4 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                  <option value="5">5 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                  <option value="6">6 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                  <option value="7">7 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                  <option value="8">8 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                  <option value="9">9 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                  <option value="10">10 { translate('SETTINGS.ACCOUNTS_SM') }</option>
                </select>
              </div>
              <div className="col-sm-2 no-padding-left text-center margin-top-10">
                <select
                  className="form-control form-material"
                  name="addressdepth"
                  value={ this.state.addressdepth }
                  onChange={ (event) => this.updateInput(event) }
                  autoFocus>
                  <option value="20">20 { translate('SETTINGS.ADDRESSES_SM') }</option>
                  <option value="30">30 { translate('SETTINGS.ADDRESSES_SM') }</option>
                  <option value="40">40 { translate('SETTINGS.ADDRESSES_SM') }</option>
                  <option value="50">50 { translate('SETTINGS.ADDRESSES_SM') }</option>
                  <option value="60">60 { translate('SETTINGS.ADDRESSES_SM') }</option>
                  <option value="70">70 { translate('SETTINGS.ADDRESSES_SM') }</option>
                  <option value="80">80 { translate('SETTINGS.ADDRESSES_SM') }</option>
                  <option value="90">90 { translate('SETTINGS.ADDRESSES_SM') }</option>
                  <option value="100">100 { translate('SETTINGS.ADDRESSES_SM') }</option>
                </select>
              </div>
            </div>
          </div>
          { this.state.keys &&
            <div className="col-sm-12 margin-top-30 margin-bottom-20">
              { this.state.keys !== 'empty' &&
                <div>
                  <strong>WIF:</strong> <span>{ this.state.keys.priv }</span>
                  <button
                    className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
                    title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                    onClick={ () => this._copyCoinAddress(this.state.keys.priv) }>
                      <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
                  </button>
                </div>
              }
              { this.state.keys === 'empty' &&
                <strong>{ translate('SETTINGS.KEY_IS_NOT_FOUND') }</strong>
              }
            </div>
          }
        </div>
      </div>
    );
  };
}

export default Bip39KeysPanel;