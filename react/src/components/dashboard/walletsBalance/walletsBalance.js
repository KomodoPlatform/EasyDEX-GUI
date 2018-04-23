import React from 'react';
import { connect } from 'react-redux';
import translate from '../../../translate/translate';
import {
  getDashboardUpdate,
  shepherdElectrumBalance,
} from '../../../actions/actionCreators';
import mainWindow from '../../../util/mainWindow';
import Config from '../../../config';
import formatValue from '../../../util/formatValue';
import ReactTooltip from 'react-tooltip';

import Store from '../../../store';

import WalletsBalanceRender from './walletsBalance.render';

class WalletsBalance extends React.Component {
  constructor() {
    super();
    this.state = {
      currentAddress: null,
      loading: false,
    };
    this.isFullySynced = this.isFullySynced.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.ActiveCoin.activeAddress) {
      this.setState(Object.assign({}, this.state, {
        currentAddress: this.props.ActiveCoin.activeAddress,
      }));
    }
  }

  isFullySynced() {
    const _progress = this.props.ActiveCoin.progress;

    if (_progress &&
        (Number(_progress.balances) +
        Number(_progress.validated) +
        Number(_progress.bundles) +
        Number(_progress.utxo)) / 4 === 100) {
      return true;
    } else {
      return false;
    }
  }

  refreshBalance() {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);

    if (this.props.ActiveCoin.mode === 'native') {
      Store.dispatch(getDashboardUpdate(this.props.ActiveCoin.coin));
    } else if (this.props.ActiveCoin.mode === 'spv') {
      Store.dispatch(
        shepherdElectrumBalance(
          this.props.ActiveCoin.coin,
          this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub
        )
      );
    }
  }

  renderBalance(type, returnFiatPrice) {
    const _mode = this.props.ActiveCoin.mode;
    let _balance = 0;

    if (this.props.ActiveCoin.balance === 'connection error or incomplete data') {
      _balance = '-777';
    }

    if (_mode === 'native') {
      if (this.props.ActiveCoin.balance &&
          this.props.ActiveCoin.balance[type]) {
        _balance = this.props.ActiveCoin.balance[type];
      }
    } else if (_mode === 'spv' && this.props.ActiveCoin.balance.balance) {
      if (this.props.ActiveCoin.coin === 'KMD') {
        if (type === 'total' &&
            this.props.ActiveCoin.balance &&
            this.props.ActiveCoin.balance.total) {
          _balance = this.props.ActiveCoin.balance.total;
        }

        if (type === 'interest' &&
            this.props.ActiveCoin.balance &&
            this.props.ActiveCoin.balance.interest) {
          _balance = this.props.ActiveCoin.balance.interest;
        }

        if (type === 'transparent' &&
            this.props.ActiveCoin.balance &&
            this.props.ActiveCoin.balance.balance) {
          _balance = this.props.ActiveCoin.balance.balance;
        }
      } else {
        _balance = this.props.ActiveCoin.balance.balance;
      }
    }

    if (mainWindow.appConfig.fiatRates &&
        this.props.Dashboard.prices &&
        returnFiatPrice) {
      const _prices = this.props.Dashboard.prices;
      let _fiatPriceTotal = 0;
      let _fiatPricePerCoin = 0;

      if (this.props.ActiveCoin.coin === 'KMD') {
        if (_prices.fiat &&
            _prices.fiat.USD) {
          _fiatPriceTotal = formatValue(_balance * _prices.fiat.USD);
          _fiatPricePerCoin = _prices.fiat.USD;
        }
      } else {
        if (_prices.fiat &&
            _prices.fiat.USD &&
            _prices[`${this.props.ActiveCoin.coin}/KMD`] &&
            _prices[`${this.props.ActiveCoin.coin}/KMD`].low) {
          _fiatPriceTotal = _balance * _prices.fiat.USD * _prices[`${this.props.ActiveCoin.coin}/KMD`].low;
          _fiatPricePerCoin = _prices.fiat.USD * _prices[`${this.props.ActiveCoin.coin}/KMD`].low;
        }
      }

      return (
        <div>
          <div className="text-right">{ _balance }</div>
          { _fiatPriceTotal > 0 &&
            _fiatPricePerCoin > 0 &&
            <span>
              <div
                data-tip={ `Price per 1 ${this.props.ActiveCoin.coin} ~ $${formatValue(_fiatPricePerCoin)}` }
                className="text-right">${ formatValue(_fiatPriceTotal) }</div>
              <ReactTooltip
                effect="solid"
                className="text-left" />
            </span>
          }
        </div>
      );
    } else {
      if (Config.roundValues) {
        return formatValue(_balance);
      } else {
        return Number(_balance);
      }
    }
  }

  isActiveCoinMode(coinMode) {
    return this.props.ActiveCoin.mode === coinMode;
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span key={ `translate-${Math.random(0, 9) * 10}` }>
        {_translation}
        <br />
      </span>
    );
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.coin &&
        this.props.ActiveCoin.activeSection === 'default' &&
        !this.props.ActiveCoin.send &&
        !this.props.ActiveCoin.receive) {
      return WalletsBalanceRender.call(this);
    }

    return null;
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
      cache: state.ActiveCoin.cache,
      activeSection: state.ActiveCoin.activeSection,
      activeAddress: state.ActiveCoin.activeAddress,
      progress: state.ActiveCoin.progress,
    },
    Dashboard: state.Dashboard,
  };
};

export default connect(mapStateToProps)(WalletsBalance);