import React from 'react';
import translate from '../../../translate/translate';
import { connect } from 'react-redux';
import {
  copyCoinAddress,
  shepherdElectrumKeys,
  triggerToaster,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import ReactTooltip from 'react-tooltip';

const SEED_TRIM_TIMEOUT = 5000;

class ExportKeysPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      seedInputVisibility: false,
      trimPassphraseTimer: null,
      wifkeysPassphrase: '',
      keys: null,
      seedExtraSpaces: false,
    };
    this.exportWifKeys = this.exportWifKeys.bind(this);
    this.toggleSeedInputVisibility = this.toggleSeedInputVisibility.bind(this);
    this._copyCoinAddress = this._copyCoinAddress.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.Dashboard &&
        props.Dashboard.activeSection !== 'settings') {
      this.setState(Object.assign({}, this.state, {
        keys: null,
        wifkeysPassphrase: '',
      }));

      // reset input vals
      this.refs.wifkeysPassphrase.value = '';
      this.refs.wifkeysPassphraseTextarea.value = '';
    }
  }

  exportWifKeys() {
    shepherdElectrumKeys(this.state.wifkeysPassphrase)
    .then((keys) => {
      if (keys === 'error') {
        Store.dispatch(
          triggerToaster(
            translate('SETTINGS.WRONG_PASSPHRASE') + ' or WIF key format',
            translate('TOASTR.WALLET_NOTIFICATION'),
            'error'
          )
        );
      } else {
        this.setState(Object.assign({}, this.state, {
          keys: keys.result,
          wifkeysPassphrase: '',
        }));

        // reset input vals
        this.refs.wifkeysPassphrase.value = '';
        this.refs.wifkeysPassphraseTextarea.value = '';
      }
    })
  }

  toggleSeedInputVisibility() {
    this.setState({
      seedInputVisibility: !this.state.seedInputVisibility,
    });
  }

  _copyCoinAddress(address) {
    Store.dispatch(copyCoinAddress(address));
  }

  renderWifKeys() {
    let items = [];

    if (this.state.keys) {
      const _wifKeys = this.state.keys;

      for (let _key in _wifKeys) {
        items.push(
          <tr key={ _key }>
            <td className="padding-bottom-30">
              <strong className="padding-right-20">{ _key }</strong>{ _wifKeys[_key].pub }
              <button
                className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
                title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                onClick={ () => this._copyCoinAddress(_wifKeys[_key].pub) }>
                  <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
              </button>
            </td>
            <td className="padding-bottom-30 padding-left-15">
              { _wifKeys[_key].priv }
              <button
                className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
                title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                onClick={ () => this._copyCoinAddress(_wifKeys[_key].priv) }>
                  <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
              </button>
            </td>
          </tr>
        );
      }

      return items;
    } else {
      return null;
    }
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

    if (e.target.name === 'wifkeysPassphrase') {
      this.resizeLoginTextarea();
    }

    this.setState({
      trimPassphraseTimer: _trimPassphraseTimer,
      [e.target.name === 'wifkeysPassphraseTextarea' ? 'wifkeysPassphrase' : e.target.name]: newValue,
    });
  }

  resizeLoginTextarea() {
    // auto-size textarea
    setTimeout(() => {
      if (this.state.seedInputVisibility) {
        document.querySelector('#wifkeysPassphraseTextarea').style.height = '1px';
        document.querySelector('#wifkeysPassphraseTextarea').style.height = `${(15 + document.querySelector('#wifkeysPassphraseTextarea').scrollHeight)}px`;
      }
    }, 100);
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span key={ `settings-label-${Math.random(0, 9) * 10}` }>
        { _translation }
        <br />
      </span>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="padding-bottom-20">{ this.renderLB('INDEX.ONLY_ACTIVE_WIF_KEYS') }</div>
            <div className="padding-bottom-20">
              <i>{ this.renderLB('SETTINGS.EXPORT_KEYS_NOTE') }</i>
            </div>
            <strong>
              <i>{ translate('INDEX.PLEASE_KEEP_KEYS_SAFE') }</i>
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div
              className="wifkeys-form"
              autoComplete="off">
              <div className="form-group form-material floating">
                <input
                  type="password"
                  className={ !this.state.seedInputVisibility ? 'form-control' : 'hide' }
                  autoComplete="off"
                  name="wifkeysPassphrase"
                  ref="wifkeysPassphrase"
                  id="wifkeysPassphrase"
                  onChange={ this.updateInput }
                  value={ this.state.wifkeysPassphrase } />
                <textarea
                  className={ this.state.seedInputVisibility ? 'form-control' : 'hide' }
                  autoComplete="off"
                  id="wifkeysPassphraseTextarea"
                  ref="wifkeysPassphraseTextarea"
                  name="wifkeysPassphraseTextarea"
                  onChange={ this.updateInput }
                  value={ this.state.wifkeysPassphrase }></textarea>
                <i
                  className={ 'seed-toggle fa fa-eye' + (!this.state.seedInputVisibility ? '-slash' : '') }
                  onClick={ this.toggleSeedInputVisibility }></i>
                <label
                  className="floating-label"
                  htmlFor="wifkeysPassphrase">{ translate('INDEX.PASSPHRASE') } / WIF</label>
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
              <div className="col-sm-12 col-xs-12 text-align-center">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light margin-bottom-5"
                  onClick={ this.exportWifKeys }>{ translate('INDEX.GET_WIF_KEYS') }</button>
              </div>
            </div>
          </div>
        </div>
        { this.state.keys &&
          <div className="row">
            <div className="col-sm-12 padding-top-15">
              <table className="table no-borders">
                <tbody>
                  <tr key={ `wif-export-table-header-pub` }>
                    <td className="padding-bottom-20 padding-top-20">
                      <strong>{ translate('SETTINGS.ADDRESS_LIST') }</strong>
                    </td>
                    <td className="padding-bottom-20 padding-top-20">
                      <strong>{ translate('SETTINGS.WIF_KEY_LIST') }</strong>
                    </td>
                  </tr>
                  { this.renderWifKeys() }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      coin: state.ActiveCoin.coin,
    },
    Settings: state.Settings,
  };
};

export default connect(mapStateToProps)(ExportKeysPanel);