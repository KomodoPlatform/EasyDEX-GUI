import React from 'react';
import translate from '../../translate/translate';
import SVGFaviconBlack from './svg/faviconBlack';
import DexLoaderSmall from './dexLoaderSmall';
import mainWindow from '../../util/mainWindow';
import Store from '../../store';
import {
  shepherdMMRequest,
  dexActiveSection,
} from '../../actions/actionCreators';
import { connect } from 'react-redux';
import DexSwapHistory from './dexSwapHistory';

// TODO: extend price pairs to include all possible combinations

class DexCoins extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: {
        kmd: 0,
        btc: 0,
      },
      coinLoading: false,
      prices: {},
      renderAddCoin: false,
    };
    this.calcTotalBalance = this.calcTotalBalance.bind(this);
    this.togglePrices = this.togglePrices.bind(this);
    this.toggleSwaps = this.toggleSwaps.bind(this);
    this.toggleAddCoin = this.toggleAddCoin.bind(this);
  }

  toggleAddCoin() {
    this.setState({
      renderAddCoin: !this.state.renderAddCoin,
    });
  }

  togglePrices() {
    Store.dispatch(dexActiveSection(this.props.Dex.section === 'prices' ? 'coins' : 'prices'));
  }

  toggleSwaps() {
    Store.dispatch(dexActiveSection(this.props.Dex.section === 'swaps' ? 'coins' : 'swaps'));
  }

  getPrices(props) {
    const _dex = props.Dex;
    let _prices = {};
    let _pairDiv = {};

    if (_dex &&
        _dex.prices &&
        _dex.prices.length) {
      for (let i = 0; i < _dex.prices.length; i++) {
        for (let j = 0; j < _dex.prices[i].asks.length; j++) {
          if (!_prices[_dex.prices[i].asks[j][0] + '/' + _dex.prices[i].asks[j][1]]) {
            _pairDiv[_dex.prices[i].asks[j][0] + '/' + _dex.prices[i].asks[j][1]] = 1;
            _prices[_dex.prices[i].asks[j][0] + '/' + _dex.prices[i].asks[j][1]] = _dex.prices[i].asks[j][2];
          } else { // average
            _pairDiv[_dex.prices[i].asks[j][0] + '/' + _dex.prices[i].asks[j][1]] += 1;
            _prices[_dex.prices[i].asks[j][0] + '/' + _dex.prices[i].asks[j][1]] += _dex.prices[i].asks[j][2];
          }
        }
      }

      for (let key in _prices) {
        _prices[key] = (_prices[key] / _pairDiv[key]).toFixed(8);
      }
    }

    this.setState({
      prices: _prices,
    });
    console.warn('prices', _prices);
  }

  renderBalanceTotal() {
    if (this.props.Dex &&
        this.props.Dex.coins &&
        this.props.Dex.rates &&
        this.state.prices) {
      const coins = this.props.Dex.coins;
      const prices = this.state.prices;
      const rates = this.props.Dex.rates;
      let _totalKMDValue = 0;

      for (let i = 0; i < coins.length; i++) {
        // console.log(coins[i].coin + ' ' + coins[i].balance);
        if (Number(coins[i].balance) > 0) {
          console.warn(coins[i].balance, `${coins[i].coin}/KMD ${prices[`${coins[i].coin}/KMD`]}`);

          if (coins[i].coin === 'KMD') {
            _totalKMDValue += Number(coins[i].balance);
          } else {
            _totalKMDValue += Number(coins[i].balance) * prices[`${coins[i].coin}/KMD`];
          }
        }
      }

      return (
        <h1 style={{ color: '#9e9e9e' }}>
          <label>Estimated balance</label>
          <span>{ (_totalKMDValue * rates.BTC).toFixed(8) } BTC</span>
          <span>{ (_totalKMDValue).toFixed(8) } KMD</span>
          <small className="margin-top-10 margin-bottom-25">${ (_totalKMDValue * rates.USD).toFixed(8) }</small>
        </h1>
      );
    } else {
      return null;
    }
  }

  calcTotalBalance(rates, coins, prices) {
    let _coins = {};
    let _totalKMDValue = 0;

    if (rates &&
        rates.BTC &&
        rates.USD) {
      for (let i = 0; i < coins.length; i++) {
        console.log(coins[i].coin + ' ' + coins[i].balance);
        _coins[coins[i].coin] = coins[i];
        if (Number(coins[i].balance) > 0) {
          _totalKMDValue += Number(coins[i].KMDvalue);
        }
      }
      console.log(_totalKMDValue);
    }
  }

  componentWillMount() {
    // this.calcTotalBalance();
  }

  componentWillReceiveProps(props) {
    this.getPrices(props);
  }

  renderCoins() {
    const _coins = this.props.Dex.coins;
    const _coinsHelper = this.props.Dex.coinsHelper;
    let _items = [];

    if (this.state.renderAddCoin) {
      _items.push(
        <li
          onClick={ this.toggleAddCoin }
          key="coinList-coin add-new-coin"
          className="coinList-coin add-new-coin">
          <span
            style={{ position: 'relative', transform: 'rotate(180deg)' }}
            className="coinList-coin_action">
            <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
              <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
            </svg>
          </span>
          <a>
            <div className="coinList-coin_icon coin-colorized">
              <i className="crypto-icons-pack">
              </i>
            </div>
            <div className="coinList-coin_balance">
              <strong>Back</strong>
            </div>
          </a>
        </li>
      );
    }

    for (let i = 0; i < _coins.length; i++) {
      const _coinName = _coinsHelper[_coins[i].coin].name ? _coinsHelper[_coins[i].coin].name : (_coinsHelper[_coins[i].coin].asset ? _coinsHelper[_coins[i].coin].asset : _coinsHelper[_coins[i].coin].coin);

      if ((!this.state.renderAddCoin && _coins[i].status === 'active') ||
          (this.state.renderAddCoin && _coins[i].status === 'inactive')) {
        _items.push(
          <li
            key={ `coinList-coin ${_coins[i].coin}` }
            className={ `coinList-coin ${_coins[i].coin}` }>
            <a className={ _coins[i].coin }>
              <div className="coinList-coin_icon coin-colorized">
                <i className={ `coin-icon-svg crypto-icons-pack ${_coins[i].coin}` }>
                  <img src={ `/assets/images/cryptologo/${_coins[i].coin.toLowerCase()}.png` } />
                </i>
              </div>
              <div className={ `coinList-coin_balance ${_coins[i].coin}` }>
                <strong className="coinList-coin_balance-name">{ _coinName.indexOf('coin') > -1 && _coinName.indexOf('itcoin') === -1 ? _coinName.replace('coin', 'Coin') : _coinName }</strong>
                <strong className="coinList-coin_balance-amount">
                  { _coins[i].balance } { _coins[i].coin }
                </strong>
                <small>{ _coins[i].electrum ? 'Electrum mode' : 'Native mode' }</small>
              </div>
              <span className="coinList-coin_action">
                <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                  <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
                </svg>
              </span>
              { this.state.coinLoading &&
                <DexLoaderSmall />
              }
            </a>
          </li>
        );
      }
    }

    if (!this.state.renderAddCoin) {
      _items.push(
        <li
          onClick={ this.toggleAddCoin }
          key="coinList-coin add-new-coin"
          className="coinList-coin add-new-coin">
          <a>
            <div className="coinList-coin_icon coin-colorized">
              <i className="crypto-icons-pack">
              </i>
            </div>
            <div className="coinList-coin_balance">
              <strong>Add new coin</strong>
            </div>
            <span className="coinList-coin_action">
              <svg id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512">
                <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon>
              </svg>
            </span>
          </a>
        </li>
      );
    }

    return _items;
  }

  renderPrices() {
    let _prices = this.state.prices;
    let _items = [];

    _prices['KMD/USD'] = this.props.Dex.rates.USD;
    _prices['BTC/USD'] = this.props.Dex.rates.USD * _prices['BTC/KMD'];

    for (let i = 0; i < 2; i++) {
      for (let key in _prices) {
        const _pair = key.split('/');

        if ((i === 1 && key !== 'KMD/USD' && key !== 'BTC/USD') || (i === 0 && (key === 'KMD/USD' || key === 'BTC/USD'))) {
          _items.push(
            <li
              key={ `prices-${key}` }
              className="orders-item">
              <div className="orders-item-wrapper">
                <div className="orders-item-details">
                  <div className="orders-item-details-coins">
                    <section className="orders-item-details-coin">
                      <span className="orders-item-details-coin-amount">
                        { _pair[0] }
                      </span>
                      <div className="orders-item-details-coin-icon coin-colorized">
                        <i className="coin-icon-svg">
                          <img src={ `/assets/images/cryptologo/${_pair[0].toLowerCase()}.png` } />
                        </i>
                      </div>
                    </section>
                    <div className="orders-item-details-type">
                      <i className="orders-item-details-coins-tradeType">
                        <svg fill="#A8A8A8" viewBox="0 0 24 24">
                          <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
                          <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                      </i>
                    </div>
                    <section className="orders-item-details-coin">
                      <div className="orders-item-details-coin-icon coin-colorized">
                        <i className="coin-icon-svg">
                          <img src={ `/assets/images/cryptologo/${_pair[1].toLowerCase()}.png` } />
                        </i>
                      </div>
                      <span className="orders-item-details-coin-amount">
                       { _pair[1] }
                      </span>
                    </section>
                    <section className="orders-item-details-price">
                      <span className="orders-item-details-type-label">{ _prices[key] } { _pair[1] }</span>
                    </section>
                  </div>
                </div>
              </div>
            </li>
          );
        }
      }
    }

    return (
      <section className="balance-action">
        <ul className="orders-list singleColumn noHover prices">
          { _items }
        </ul>
      </section>
    );
  }

  render() {
    return (
      <section className="dashboard">
        <section className="dashboard-wallets">
          <header className="dashboard-wallets-header component-header">
            <i className="dashboard-empty-logo">
              <SVGFaviconBlack />
            </i>
            <div className="recharts-responsive-container dashboard-balances-pie" style={{ width: '250px', height: '450px' }}>
            { /* portfolio chart here */ }
            </div>
            { this.renderBalanceTotal() }
            <button
              className="action dark margin-top-15"
              onClick={ this.toggleSwaps }>
              <span>swap history</span>
              <i>
                <svg id="Layer_1" style={{ enableBackground: 'new 0 0 30 30' }} version="1.1" viewBox="0 0 30 30">
                  <path d="M16.414,13.586c0.781,0.781,0.781,2.047,0,2.828c-0.781,0.781-2.047,0.781-2.828,0c-0.544-0.544-3.044-4.418-4.508-6.715 C8.818,9.292,9.292,8.818,9.699,9.078C11.996,10.542,15.87,13.041,16.414,13.586z"></path>
                  <path d="M6.58,7.93 C4.971,9.841,4,12.306,4,15c0,6.075,4.925,11,11,11s11-4.925,11-11S21.075,4,15,4v4" style={{ fill: 'none', stroke: '#CCC', strokeWidth: '2', strokeLinecap: 'round', strokeMiterlimit: '10' }}></path>
                </svg>
              </i>
            </button>
            <button
              className="action dark margin-top-15"
              onClick={ this.togglePrices }>
              <span>prices</span>
              <i>
                <svg id="Layer_1" style={{ enableBackground: 'new 0 0 30 30' }} version="1.1" viewBox="0 0 30 30">
                  <path d="M26,26h-4V13c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1V26z"/>
                  <path d="M20,26h-4v-9c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1V26z"/>
                  <path d="M14,26h-4V15c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1V26z"/>
                  <path d="M8,26H4v-7c0-0.552,0.448-1,1-1h2c0.552,0,1,0.448,1,1V26z"/>
                  <circle cx="24" cy="6" r="2"/>
                  <circle cx="18" cy="11" r="2"/>
                  <circle cx="12" cy="8" r="2"/>
                  <circle cx="6" cy="12" r="2"/>
                  <polyline points="  6,12 12,8 18,11 24,6 " style={{ fill: 'none', stroke: '#000000', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }}/>
                </svg>
              </i>
            </button>
          </header>
          { this.props.Dex.section === 'coins' &&
            <ul className="dashboard-wallets-list">
              { this.renderCoins() }
            </ul>
          }
          { this.props.Dex.section === 'prices' &&
            <div>{ this.renderPrices() }</div>
          }
          { this.props.Dex.section === 'swaps' &&
            <DexSwapHistory />
          }
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Dashboard: state.Dashboard,
    Dex: state.Dex,
  };
};

export default connect(mapStateToProps)(DexCoins);
