import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Store from '../../../store';
import {
  toggleClaimInterestModal,
  getListUnspent,
  getRawTransaction,
  copyString,
  sendToAddressPromise,
  triggerToaster,
  shepherdElectrumListunspent,
  shepherdElectrumSendPreflight,
  shepherdElectrumSendPromise,
  validateAddressPromise,
} from '../../../actions/actionCreators';
import translate from '../../../translate/translate';
import {
  ClaimInterestModalRender,
  _ClaimInterestTableRender
} from './claimInterestModal.render';

// TODO: promises

class ClaimInterestModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      isLoading: true,
      transactionsList: [],
      displayShowZeroInterestToggle: false,
      showZeroInterest: true,
      totalInterest: 0,
      spvPreflightSendInProgress: false,
      spvVerificationWarning: false,
      addressses: {},
      addressSelectorOpen: false,
      selectedAddress: null,
      loading: false,
    };
    this.claimInterestTableRender = this.claimInterestTableRender.bind(this);
    this.toggleZeroInterest = this.toggleZeroInterest.bind(this);
    this.loadListUnspent = this.loadListUnspent.bind(this);
    this.checkTransactionsListLength = this.checkTransactionsListLength.bind(this);
    this.cancelClaimInterest = this.cancelClaimInterest.bind(this);
    this.openDropMenu = this.openDropMenu.bind(this);
    this.closeDropMenu = this.closeDropMenu.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.isFullySynced = this.isFullySynced.bind(this);
    this.confirmClaimInterest = this.confirmClaimInterest.bind(this);
  }

  componentWillMount() {
    if (this.props.ActiveCoin.mode === 'native') {
      this.loadListUnspent();
    }
  }

  isFullySynced() {
    if (this.props.ActiveCoin.progress &&
        this.props.ActiveCoin.progress.longestchain &&
        this.props.ActiveCoin.progress.blocks &&
        this.props.ActiveCoin.progress.longestchain > 0 &&
        this.props.ActiveCoin.progress.blocks > 0 &&
        Number(this.props.ActiveCoin.progress.blocks) * 100 / Number(this.props.ActiveCoin.progress.longestchain) === 100) {
      return true;
    }
  }

  openDropMenu() {
    this.setState(Object.assign({}, this.state, {
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  closeDropMenu() {
    if (this.state.addressSelectorOpen) {
      setTimeout(() => {
        this.setState(Object.assign({}, this.state, {
          addressSelectorOpen: false,
        }));
      }, 100);
    }
  }

  updateAddressSelection(address) {
    this.setState(Object.assign({}, this.state, {
      selectedAddress: address,
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  loadListUnspent() {
    let _transactionsList = [];
    let _totalInterest = 0;
    let _zeroInterestUtxo = false;

    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);

    if (this.props.ActiveCoin.mode === 'spv') {
      shepherdElectrumListunspent(
        this.props.ActiveCoin.coin,
        this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub
      ).then((json) => {
        if (json !== 'error' &&
            json.result &&
            typeof json.result !== 'string') {
          json = json.result;

          for (let i = 0; i < json.length; i++) {
            if (json[i].interest === 0) {
              _zeroInterestUtxo = true;
            }

            _transactionsList.push({
              address: json[i].address,
              locktime: json[i].locktime,
              amount: Number(json[i].amount.toFixed(8)),
              interest: Number(json[i].interest.toFixed(8)),
              txid: json[i].txid,
            });
            _totalInterest += Number(json[i].interest.toFixed(8));

            if (i === json.length - 1) {
              this.setState({
                transactionsList: _transactionsList,
                isLoading: false,
                totalInterest: _totalInterest,
                displayShowZeroInterestToggle: _zeroInterestUtxo,
              });
            }
          }
        } else {
          this.setState({
            transactionsList: [],
            isLoading: false,
            totalInterest: 0,
          });
        }
      });
    } else {
      getListUnspent(this.props.ActiveCoin.coin)
      .then((json) => {
        if (json &&
            json.length) {
          let _addresses = {};

          for (let i = 0; i < json.length; i++) {
            getRawTransaction(this.props.ActiveCoin.coin, json[i].txid)
            .then((_json) => {
              if (json[i].interest === 0) {
                _zeroInterestUtxo = true;
              }
              _addresses[json[i].address] = json[i].address;
              _transactionsList.push({
                address: json[i].address,
                locktime: _json.locktime,
                amount: json[i].amount,
                interest: json[i].interest,
                txid: json[i].txid,
              });
              _totalInterest += Number(json[i].interest);

              if (i === json.length - 1) {
                this.setState({
                  transactionsList: _transactionsList,
                  isLoading: false,
                  totalInterest: _totalInterest,
                  addressses: _addresses,
                  selectedAddress: this.state.selectedAddress ? this.state.selectedAddress : _addresses[Object.keys(_addresses)[0]],
                  displayShowZeroInterestToggle: _zeroInterestUtxo,
                });
              }
            });
          }
        }
      });
    }
  }

  cancelClaimInterest() {
    this.setState(Object.assign({}, this.state, {
      spvVerificationWarning: false,
      spvPreflightSendInProgress: false,
    }));
  }

  confirmClaimInterest() {
    shepherdElectrumSendPromise(
      this.props.ActiveCoin.coin,
      this.props.ActiveCoin.balance.balanceSats,
      this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub,
      this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub
    ).then((res) => {
      if (res.msg === 'error') {
        Store.dispatch(
          triggerToaster(
            res.result,
            translate('TOASTR.ERROR'),
            'error'
          )
        );
      } else {
        Store.dispatch(
          triggerToaster(
            `${translate('TOASTR.CLAIM_INTEREST_BALANCE_SENT_P1')} ${this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub}. ${translate('TOASTR.CLAIM_INTEREST_BALANCE_SENT_P2')}`,
            translate('TOASTR.WALLET_NOTIFICATION'),
            'success',
            false
          )
        );
        this.closeModal();
      }
    });
  }

  claimInterest(address, amount) {
    if (this.props.ActiveCoin.coin === 'KMD') {
      if (this.props.ActiveCoin.mode === 'spv') {
        this.setState(Object.assign({}, this.state, {
          spvVerificationWarning: false,
          spvPreflightSendInProgress: true,
        }));

        shepherdElectrumSendPreflight(
          this.props.ActiveCoin.coin,
          this.props.ActiveCoin.balance.balanceSats,
          this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub,
          this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub
        ).then((sendPreflight) => {
          if (sendPreflight &&
              sendPreflight.msg === 'success') {
            this.setState(Object.assign({}, this.state, {
              spvVerificationWarning: !sendPreflight.result.utxoVerified,
              spvPreflightSendInProgress: false,
            }));

            if (sendPreflight.result.utxoVerified) {
              this.confirmClaimInterest();
            }
          } else {
            Store.dispatch(
              triggerToaster(
                sendPreflight.result,
                'Error',
                'error'
              )
            );
            this.setState(Object.assign({}, this.state, {
              spvPreflightSendInProgress: false,
            }));
          }
        });
      } else {
        validateAddressPromise(
          this.props.ActiveCoin.coin,
          this.state.selectedAddress
        )
        .then((json) => {
          if (json.error &&
              json.error.code) {
            Store.dispatch(
              triggerToaster(
                json.error.message,
                translate('TOASTR.ERROR'),
                'error'
              )
            );
          } else if (json.result && !json.result.iswatchonly && json.result.ismine && json.result.isvalid && !json.result.isscript) {
            sendToAddressPromise(
              this.props.ActiveCoin.coin,
              this.state.selectedAddress,
              this.props.ActiveCoin.balance.transparent
            ).then((json) => {
              if (json.error &&
                  json.error.code) {
                Store.dispatch(
                  triggerToaster(
                    json.error.message,
                    translate('TOASTR.ERROR'),
                    'error'
                  )
                );
              } else if (json.result && json.result.length && json.result.length === 64) {
                Store.dispatch(
                  triggerToaster(
                    `${translate('TOASTR.CLAIM_INTEREST_BALANCE_SENT_P1')} ${this.state.selectedAddress}. ${translate('TOASTR.CLAIM_INTEREST_BALANCE_SENT_P2')}`,
                    translate('TOASTR.WALLET_NOTIFICATION'),
                    'success',
                    false
                  )
                );
                this.closeModal();
              }
            });
          } else {
            Store.dispatch(
              triggerToaster(
                `${translate('TOASTR.FAILED_TO_VERIFY_ADDR')} ${this.state.selectedAddress}`,
                translate('TOASTR.ERROR'),
                'error'
              )
            );
          }
        });
      }
    }
  }

  checkTransactionsListLength() {
    if (this.state.transactionsList &&
        this.state.transactionsList.length) {
      return true;
    } else if (!this.state.transactionsList || !this.state.transactionsList.length) {
      return false;
    }
  }

  toggleZeroInterest() {
    this.setState({
      showZeroInterest: !this.state.showZeroInterest,
    });
  }

  copyTxId(txid) {
    Store.dispatch(copyString(txid, translate('TOASTR.TXID_COPIED')));
  }

  claimInterestTableRender() {
    return _ClaimInterestTableRender.call(this);
  }

  addressDropdownRender() {
    let _items = [];

    for (let key in this.state.addressses) {
      _items.push(
        <li
          className="selected"
          key={ key }>
          <a onClick={ () => this.updateAddressSelection(key) }>
            <span className="text">{ key }</span>
            <span
              className="glyphicon glyphicon-ok check-mark pull-right"
              style={{ display: this.state.selectedAddress === key ? 'inline-block' : 'none' }}></span>
          </a>
        </li>
      );
    }

    return (
      <div className={ `btn-group bootstrap-select form-control form-material showkmdwalletaddrs show-tick ${(this.state.addressSelectorOpen ? 'open' : '')}` }>
        <button
          type="button"
          className={ 'btn dropdown-toggle btn-info' + (this.props.ActiveCoin.mode === 'spv' ? ' disabled' : '') }
          onClick={ this.openDropMenu }>
          <span className="filter-option pull-left">{ this.state.selectedAddress }</span>
          <span className="bs-caret inline">
            <span className="caret"></span>
          </span>
        </button>
        <div className="dropdown-menu open">
          <ul className="dropdown-menu inner">
            { _items }
          </ul>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    if (props.Dashboard.displayClaimInterestModal !== this.state.open) {
      this.setState({
        open: props.Dashboard.displayClaimInterestModal,
      });
    }

    if (!this.state.open &&
        props.Dashboard.displayClaimInterestModal) {
      this.loadListUnspent();
    }
  }

  closeModal() {
    this.setState({
      isLoading: true,
      transactionsList: [],
      showZeroInterest: true,
      totalInterest: 0,
      spvPreflightSendInProgress: false,
      spvVerificationWarning: false,
      addressses: {},
      addressSelectorOpen: false,
      selectedAddress: null,
    });
    Store.dispatch(toggleClaimInterestModal(false));
  }

  render() {
    if (this.props.ActiveCoin &&
        this.props.ActiveCoin.coin &&
        this.props.ActiveCoin.coin === 'KMD') {
      return ClaimInterestModalRender.call(this);
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      mode: state.ActiveCoin.mode,
      coin: state.ActiveCoin.coin,
      balance: state.ActiveCoin.balance,
      activeSection: state.ActiveCoin.activeSection,
      progress: state.ActiveCoin.progress,
    },
    Dashboard: {
      displayClaimInterestModal: state.Dashboard.displayClaimInterestModal,
      electrumCoins: state.Dashboard.electrumCoins,
    },
  };
};

export default connect(mapStateToProps)(ClaimInterestModal);
