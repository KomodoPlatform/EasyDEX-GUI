import React from 'react';
import translate from '../../../translate/translate';
import { connect } from 'react-redux';
import { getWalletDatKeys } from '../../../actions/actionCreators';
import { coindList } from '../../../util/coinHelper';
import Store from '../../../store';

class NativeWalletDatKeysPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      coin: 'none',
      keys: null,
      keyMatchPattern: '',
      loading: false,
    };
    this._getWalletDatKeys = this._getWalletDatKeys.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.Dashboard &&
        props.Dashboard.activeSection !== 'settings') {
      this.setState(Object.assign({}, this.state, {
        keys: null,
        keyMatchPattern: null,
      }));
    }
  }

  _getWalletDatKeys() {
    const _coin = this.state.coin;

    this.setState({
      loading: true,
      keys: null,
    });

    setTimeout(() => {
      getWalletDatKeys(_coin, this.state.keyMatchPattern.length ? this.state.keyMatchPattern : null)
      .then((res) => {
        this.setState({
          keys: res,
          loading: false,
        });

        if (res.msg === 'success' &&
            res.result.length > 0) {
          setTimeout(() => {
            document.querySelector('#coind-keys-textarea-left').style.height = '1px';
            document.querySelector('#coind-keys-textarea-left').style.height = `${(15 + document.querySelector('#coind-keys-textarea-left').scrollHeight)}px`;
            document.querySelector('#coind-keys-textarea-right').style.height = `${(15 + document.querySelector('#coind-keys-textarea-right').scrollHeight)}px`;
          }, 100);
        }
      });
    }, 100);
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderCoinListSelectorOptions() {
    let _items = [];
    let _nativeCoins = coindList();

    _items.push(
      <option
        key={ `coind-walletdat-coins-none` }
        value="none">{ translate('SETTINGS.PICK_A_COIN') }</option>
    );
    for (let i = 0; i < _nativeCoins.length; i++) {
      _items.push(
        <option
          key={ `coind-walletdat-coins-${ _nativeCoins[i] }` }
          value={ `${_nativeCoins[i]}` }>{ `${_nativeCoins[i]}` }</option>
      );
    }

    return _items;
  }

  renderKeys() {
    const _keys = this.state.keys;
    let _items = [];

    if (_keys.msg === 'error') {
      return (
        <div>{ _keys.result }</div>
      );
    } else {
      let _addresses = '';
      let _wifs = '';

      for (let i = 0; i < _keys.result.length; i++) {
        _addresses += _keys.result[i].pub + '\n';
        _wifs += _keys.result[i].priv + '\n';
      }

      return (
        <div>
          <div className="col-sm-12 margin-bottom-20">
            { translate('SETTINGS.FOUND') } <strong>{ _keys.result.length }</strong> { translate('SETTINGS.KEYS_SM') }
          </div>
          { _keys.result.length > 0 &&
            <div className="col-sm-6">
              <div>
                <strong>{ translate('SETTINGS.ADDRESS') }</strong>
              </div>
              <textarea
                readOnly
                id="coind-keys-textarea-left"
                className="form-control settings-coind-stdout-textarea"
                value={ _addresses }></textarea>
            </div>
          }
          { _keys.result.length > 0 &&
            <div className="col-sm-6">
              <div>
                <strong>WIF</strong>
              </div>
              <textarea
                readOnly
                id="coind-keys-textarea-right"
                className="form-control settings-coind-stdout-textarea"
                value={ _wifs }></textarea>
            </div>
          }
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 padding-bottom-10">
            <div>
              <div className="col-sm-4 no-padding-left text-center">
                <select
                  className="form-control form-material"
                  name="coin"
                  value={ this.state.coin }
                  onChange={ (event) => this.updateInput(event) }
                  autoFocus>
                  { this.renderCoinListSelectorOptions() }
                </select>
                <input
                  type="text"
                  className="form-control margin-top-10"
                  autoComplete="off"
                  name="keyMatchPattern"
                  onChange={ this.updateInput }
                  placeholder={ translate('SETTINGS.SEARCH_KEY_PATTERN') }
                  value={ this.state.keyMatchPattern } />
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light margin-top-20"
                  disabled={ this.state.loading || this.state.coin === 'none' }
                  onClick={ this._getWalletDatKeys }>{ this.state.loading ? translate('SETTINGS.FETCHING_KEYS') + '...' : translate('SETTINGS.GET_KEYS') }</button>
              </div>
            </div>
          </div>
          { this.state.keys &&
            <div className="col-sm-12">
              <div className="form-group form-material floating no-padding-left">
              <hr />
              { this.renderKeys() }
              </div>
            </div>
          }
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    Dashboard: state.Dashboard,
  };
};

export default connect(mapStateToProps)(NativeWalletDatKeysPanel);