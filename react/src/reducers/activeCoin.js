import {
  DASHBOARD_ACTIVE_COIN_CHANGE,
  DASHBOARD_ACTIVE_COIN_BALANCE,
  DASHBOARD_ACTIVE_COIN_SEND_FORM,
  DASHBOARD_ACTIVE_COIN_RECEIVE_FORM,
  DASHBOARD_ACTIVE_COIN_RESET_FORMS,
  DASHBOARD_ACTIVE_SECTION,
  DASHBOARD_ACTIVE_TXINFO_MODAL,
  ACTIVE_COIN_GET_ADDRESSES,
  DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE,
  DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY,
  DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS,
  DASHBOARD_ACTIVE_COIN_SENDTO,
  DASHBOARD_ACTIVE_ADDRESS,
  DASHBOARD_ACTIVE_COIN_GETINFO_FAILURE,
  SYNCING_NATIVE_MODE,
  DASHBOARD_UPDATE,
  DASHBOARD_ELECTRUM_BALANCE,
  DASHBOARD_ELECTRUM_TRANSACTIONS,
  DASHBOARD_REMOVE_COIN,
  DASHBOARD_ACTIVE_COIN_NET_PEERS,
  DASHBOARD_ACTIVE_COIN_NET_TOTALS,
} from '../actions/storeType';

// TODO: refactor current coin props copy on change

export function ActiveCoin(state = {
  coins: {},
  coin: null,
  mode: null,
  send: false,
  receive: false,
  balance: 0,
  addresses: null,
  activeSection: 'default',
  showTransactionInfo: false,
  showTransactionInfoTxIndex: null,
  txhistory: [],
  opids: null,
  lastSendToResponse: null,
  activeAddress: null,
  progress: null,
  rescanInProgress: false,
  getinfoFetchFailures: 0,
  net: {
    peers: null,
    totals: null,
  },
}, action) {
  switch (action.type) {
    case DASHBOARD_REMOVE_COIN:
      delete state.coins[action.coin];

      if (state.coin === action.coin) {
        return {
          ...state,
          coins: state.coins,
          coin: null,
          mode: null,
          balance: 0,
          addresses: null,
          txhistory: 'loading',
          send: false,
          receive: false,
          showTransactionInfo: false,
          showTransactionInfoTxIndex: null,
          activeSection: 'default',
          progress: null,
          rescanInProgress: false,
          net: {
            peers: null,
            totals: null,
          },
        };
      } else {
        return {
          ...state,
        };
      }
    case DASHBOARD_ACTIVE_COIN_CHANGE:
      if (state.coins[action.coin]) {
        const _coinData = state.coins[action.coin];
        const _coinDataToStore = {
          addresses: state.addresses,
          coin: state.coin,
          mode: state.mode,
          balance: state.balance,
          txhistory: state.txhistory,
          send: state.send,
          receive: state.receive,
          showTransactionInfo: state.showTransactionInfo,
          showTransactionInfoTxIndex: state.showTransactionInfoTxIndex,
          activeSection: state.activeSection,
          lastSendToResponse: state.lastSendToResponse,
          opids: state.opids,
          activeBasiliskAddress: state.activeBasiliskAddress,
          progress: state.progress,
          rescanInProgress: state.rescanInProgress,
          getinfoFetchFailures: state.getinfoFetchFailures,
          net: state.net,
        };
        let _coins = state.coins;

        if (!action.skip) {
          _coins[state.coin] = _coinDataToStore;
        }
        delete _coins.undefined;

        return {
          ...state,
          coins: _coins,
          addresses: _coinData.addresses,
          coin: _coinData.coin,
          mode: _coinData.mode,
          balance: _coinData.balance,
          txhistory: _coinData.txhistory,
          send: _coinData.send,
          receive: _coinData.receive,
          showTransactionInfo: _coinData.showTransactionInfo,
          showTransactionInfoTxIndex: _coinData.showTransactionInfoTxIndex,
          activeSection: _coinData.activeSection,
          lastSendToResponse: _coinData.lastSendToResponse,
          opids: _coinData.opids,
          activeBasiliskAddress: _coinData.activeBasiliskAddress,
          progress: _coinData.progress,
          rescanInProgress: _coinData.rescanInProgress,
          getinfoFetchFailures: _coinData.getinfoFetchFailures,
          net: _coinData.net,
        };
      } else {
        if (state.coin) {
          const _coinData = {
            addresses: state.addresses,
            coin: state.coin,
            mode: state.mode,
            balance: state.balance,
            txhistory: state.txhistory,
            send: state.send,
            receive: state.receive,
            showTransactionInfo: state.showTransactionInfo,
            showTransactionInfoTxIndex: state.showTransactionInfoTxIndex,
            activeSection: state.activeSection,
            lastSendToResponse: state.lastSendToResponse,
            opids: state.opids,
            activeBasiliskAddress: state.activeBasiliskAddress,
            progress: state.progress,
            rescanInProgress: state.rescanInProgress,
            getinfoFetchFailures: state.getinfoFetchFailures,
            net: state.net,
          };
          let _coins = state.coins;

          if (!action.skip) {
            _coins[state.coin] = _coinData;
          }

          return {
            ...state,
            coins: _coins,
            coin: action.coin,
            mode: action.mode,
            balance: 0,
            addresses: null,
            txhistory: 'loading',
            send: false,
            receive: false,
            showTransactionInfo: false,
            showTransactionInfoTxIndex: null,
            activeSection: 'default',
            progress: null,
            rescanInProgress: false,
            net: {
              peers: null,
              totals: null,
            },
          };
        } else {
          return {
            ...state,
            coin: action.coin,
            mode: action.mode,
            balance: 0,
            addresses: null,
            txhistory: 'loading',
            send: false,
            receive: false,
            showTransactionInfo: false,
            showTransactionInfoTxIndex: null,
            activeSection: 'default',
            progress: null,
            rescanInProgress: false,
            net: {
              peers: null,
              totals: null,
            },
          };
        }
      }
    case DASHBOARD_ELECTRUM_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case DASHBOARD_ELECTRUM_TRANSACTIONS:
      return {
        ...state,
        txhistory: action.txhistory,
      };
    case DASHBOARD_ACTIVE_COIN_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case DASHBOARD_ACTIVE_COIN_SEND_FORM:
      return {
        ...state,
        send: action.send,
        receive: false,
      };
    case DASHBOARD_ACTIVE_COIN_RECEIVE_FORM:
      return {
        ...state,
        send: false,
        receive: action.receive,
      };
    case DASHBOARD_ACTIVE_COIN_RESET_FORMS:
      return {
        ...state,
        send: false,
        receive: false,
      };
    case ACTIVE_COIN_GET_ADDRESSES:
      return {
        ...state,
        addresses: action.addresses,
      };
    case DASHBOARD_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.section,
      };
    case DASHBOARD_ACTIVE_TXINFO_MODAL:
      return {
        ...state,
        showTransactionInfo: action.showTransactionInfo,
        showTransactionInfoTxIndex: action.showTransactionInfoTxIndex,
      };
    case DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY:
      return {
        ...state,
        txhistory: action.txhistory,
      };
    case DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS:
      return {
        ...state,
        opids: action.opids,
      };
    case DASHBOARD_ACTIVE_COIN_SENDTO:
      return {
        ...state,
        lastSendToResponse: action.lastSendToResponse,
      };
    case DASHBOARD_ACTIVE_ADDRESS:
      return {
        ...state,
        activeAddress: action.address,
      };
    case SYNCING_NATIVE_MODE:
      return {
        ...state,
        progress: action.progress,
        getinfoFetchFailures: typeof action.progress === 'string' && action.progress.indexOf('"code":-777') ? state.getinfoFetchFailures + 1 : 0,
      };
    case DASHBOARD_ACTIVE_COIN_GETINFO_FAILURE:
      return {
        ...state,
        getinfoFetchFailures: state.getinfoFetchFailures + 1,
      };
    case DASHBOARD_UPDATE:
      if (state.coin === action.coin) {
        return {
          ...state,
          // progress: action.progress,
          opids: action.opids,
          txhistory: action.txhistory,
          balance: action.balance,
          addresses: action.addresses,
          rescanInProgress: action.rescanInProgress,
        };
      }
    case DASHBOARD_ACTIVE_COIN_NET_PEERS:
      return {
        ...state,
        net: {
          peers: action.peers,
          totals: state.net.totals,
        },
      };
    case DASHBOARD_ACTIVE_COIN_NET_TOTALS:
      return {
        ...state,
        net: {
          peers: state.net.peers,
          totals: action.totals,
        },
      };
    default:
      return state;
  }
}

export default ActiveCoin;
