import React from 'react';
import { connect } from 'react-redux';
import {
  copyCoinAddress,
  toggleSendCoinForm,
  toggleReceiveCoinForm,
  toggleSendReceiveCoinForms,
  toggleDashboardActiveSection,
  getNativeNettotals,
  getNativePeers,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import Config from '../../../config';
import {
  WalletsNavNoWalletRender,
  WalletsNavWithWalletRender,
} from './walletsNav.render';

const NET_INFO_INTERVAL = 10000;

class WalletsNav extends React.Component {
  constructor() {
    super();
    this.toggleSendReceiveCoinForms = this.toggleSendReceiveCoinForms.bind(this);
    this.toggleNativeWalletInfo = this.toggleNativeWalletInfo.bind(this);
    this.toggleNativeWalletTransactions = this.toggleNativeWalletTransactions.bind(this);
    this.checkTotalBalance = this.checkTotalBalance.bind(this);
    this.netInfoInterval = null;
  }

  copyMyAddress(address) {
    Store.dispatch(copyCoinAddress(address));
  }

  checkTotalBalance() {
    let _balance = '0';
    const _mode = this.props.ActiveCoin.mode;

    if (this.props.ActiveCoin.balance &&
        this.props.ActiveCoin.balance.total &&
        _mode === 'native') {
      _balance = this.props.ActiveCoin.balance.total;
    } else if (_mode === 'spv' && this.props.ActiveCoin.balance.balance) {
      _balance = this.props.ActiveCoin.balance.balance;
    }

    return _balance;
  }

  componentWillReceiveProps(props) {
    if (this.netInfoInterval &&
        props.ActiveCoin.activeSection !== 'settings') {
      clearInterval(this.netInfoInterval);
      this.netInfoInterval = null;
    }
  }

  toggleNativeWalletInfo() {
    if (this.props.ActiveCoin.activeSection !== 'settings') {
      Store.dispatch(getNativePeers(this.props.ActiveCoin.coin));
      Store.dispatch(getNativeNettotals(this.props.ActiveCoin.coin));

      this.netInfoInterval = setInterval(() => {
        Store.dispatch(getNativePeers(this.props.ActiveCoin.coin));
        Store.dispatch(getNativeNettotals(this.props.ActiveCoin.coin));
      }, NET_INFO_INTERVAL);
    }

    Store.dispatch(toggleDashboardActiveSection('settings'));
  }

  toggleNativeWalletTransactions() {
    Store.dispatch(toggleDashboardActiveSection('default'));
  }

  // TODO: merge toggle func into one
  toggleSendReceiveCoinForms() {
    Store.dispatch(
      toggleDashboardActiveSection(
        this.props.ActiveCoin.activeSection === 'settings' ? 'default' : 'settings'
      )
    );
  }

  toggleSendCoinForm(display) {
    Store.dispatch(
      toggleDashboardActiveSection(
        this.props.ActiveCoin.activeSection === 'send' ? 'default' : 'send'
      )
    );
  }

  toggleReceiveCoinForm(display) {
    Store.dispatch(
      toggleDashboardActiveSection(
        this.props.ActiveCoin.activeSection === 'receive' ? 'default' : 'receive'
      )
    );
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        !this.props.ActiveCoin.coin) {
      return null;
    }

    return WalletsNavWithWalletRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      coin: state.ActiveCoin.coin,
      mode: state.ActiveCoin.mode,
      send: state.ActiveCoin.send,
      receive: state.ActiveCoin.receive,
      balance: state.ActiveCoin.balance,
      activeSection: state.ActiveCoin.activeSection,
      activeAddress: state.ActiveCoin.activeAddress,
    },
    Dashboard: state.Dashboard,
    nativeOnly: Config.iguanaLessMode,
  };
};

export default connect(mapStateToProps)(WalletsNav);
