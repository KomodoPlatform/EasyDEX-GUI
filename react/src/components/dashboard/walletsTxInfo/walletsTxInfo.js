import React from 'react';
import { connect } from 'react-redux';
import translate from '../../../translate/translate';
import sortByDate from '../../../util/sort';
import {
  toggleDashboardTxInfoModal,
  getTxDetails,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import WalletsTxInfoRender from './walletsTxInfo.render';
import explorerList from '../../../util/explorerList';

const shell = window.require('electron').shell;

class WalletsTxInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: 0,
      txDetails: null,
      rawTxDetails: null,
    };
    this.toggleTxInfoModal = this.toggleTxInfoModal.bind(this);
    this.loadTxDetails = this.loadTxDetails.bind(this);
    this.loadRawTxDetails = this.loadRawTxDetails.bind(this);
  }

  toggleTxInfoModal() {
    Store.dispatch(toggleDashboardTxInfoModal(false));

    this.setState(Object.assign({}, this.state, {
      activeTab: 0,
    }));
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ActiveCoin.mode === 'spv' &&
        nextProps.ActiveCoin) {
      this.setState(Object.assign({}, this.state, {
        txDetails: nextProps.ActiveCoin.showTransactionInfoTxIndex,
        rawTxDetails: nextProps.ActiveCoin.showTransactionInfoTxIndex,
      }));
    } else {
      if (nextProps.ActiveCoin &&
          nextProps.ActiveCoin.txhistory &&
          nextProps.ActiveCoin.showTransactionInfoTxIndex) {
        const txInfo = nextProps.ActiveCoin.txhistory[nextProps.ActiveCoin.showTransactionInfoTxIndex];

        if (txInfo &&
            this.props.ActiveCoin.showTransactionInfoTxIndex !== nextProps.ActiveCoin.showTransactionInfoTxIndex) {
          this.loadTxDetails(nextProps.ActiveCoin.coin, txInfo.txid);
          this.loadRawTxDetails(nextProps.ActiveCoin.coin, txInfo.txid);
        }
      }
    }
  }

  loadTxDetails(coin, txid) {
    this.setState(Object.assign({}, this.state, {
      txDetails: null,
    }));

    getTxDetails(coin, txid)
    .then((json) => {
      this.setState(Object.assign({}, this.state, {
        txDetails: json,
      }));
    });
  }

  loadRawTxDetails(coin, txid) {
    getTxDetails(coin, txid, 'raw')
    .then((json) => {
      this.setState(Object.assign({}, this.state, {
        rawTxDetails: json,
      }));
    });
  }

  openTab(tab) {
    this.setState(Object.assign({}, this.state, {
      activeTab: tab,
    }));
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.toggleTxInfoModal();
    }
  }

  openExplorerWindow(txid) {
    const url = explorerList[this.props.ActiveCoin.coin].split('/').length - 1 > 2 ? `${explorerList[this.props.ActiveCoin.coin]}${txid}` : `${explorerList[this.props.ActiveCoin.coin]}/tx/${txid}`;
    return shell.openExternal(url);
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.showTransactionInfo &&
        this.props.ActiveCoin.activeSection === 'default') {
      if (this.props.ActiveCoin.mode === 'native') {
        if (this.props.ActiveCoin.txhistory &&
            this.props.ActiveCoin.showTransactionInfoTxIndex) {
          const txInfo = this.props.ActiveCoin.txhistory[this.props.ActiveCoin.showTransactionInfoTxIndex];

          return WalletsTxInfoRender.call(this, txInfo);
        } else {
          return null;
        }
      } else {
        return WalletsTxInfoRender.call(this);
      }
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      mode: state.ActiveCoin.mode,
      coin: state.ActiveCoin.coin,
      txhistory: state.ActiveCoin.txhistory,
      showTransactionInfo: state.ActiveCoin.showTransactionInfo,
      activeSection: state.ActiveCoin.activeSection,
      activeAddress: state.ActiveCoin.activeAddress,
      showTransactionInfoTxIndex: state.ActiveCoin.showTransactionInfoTxIndex,
    },
  };
};

export default connect(mapStateToProps)(WalletsTxInfo);
