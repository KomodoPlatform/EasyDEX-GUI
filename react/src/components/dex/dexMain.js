import React from 'react';
import Store from '../../store';
import translate from '../../translate/translate';
import { connect } from 'react-redux';
import {
  dashboardChangeSection,
  shepherdMMCachePreloadState,
  shepherdMMStop,
  shepherdMMStart,
  shepherdMMResetState,
  shepherdMMRequest,
} from '../../actions/actionCreators';
import mainWindow from '../../util/mainWindow';
import DexNotifier from './dexNotifier';
import DexLogin from './dexLogin';
import SVGFaviconWhite from './svg/faviconWhite';

import DexCoins from './dexCoins';
//import DexSwapHistory from './dexSwapHistory';
//import DexLoading from './dexLoading';
//import DexExchange from './dexExchange';

// TODO: portfolio, charts, extended swaps history

class DexMain extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    if (mainWindow.argv.indexOf('dexonly') > -1) {
      Store.dispatch(shepherdMMRequest({
        method: 'statsdisp',
        mapToProp: 'stats',
      }));
      Store.dispatch(shepherdMMRequest({
        method: 'getprices',
        mapToProp: 'prices',
      }));
      Store.dispatch(shepherdMMRequest({
        method: 'swapstatus',
        mapToProp: 'swaps',
      }));
    }

    mainWindow.getMMCacheData()
    .then((res) => {
      console.warn('mm cache', res);

      const { rates, coins, isAuth, swaps, asks, bids, pair, coinsHelper, electrumServersList } = res;
      Store.dispatch(shepherdMMCachePreloadState(isAuth, asks, bids, pair, coins, swaps, rates, coinsHelper, electrumServersList));
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.Dashboard &&
        this.props.Dashboard.activeSection !== 'dex' &&
        props.Dashboard.activeSection === 'dex') {
      console.warn('dashboard -> dex change');

      Store.dispatch(shepherdMMRequest({
        method: 'statsdisp',
        mapToProp: 'stats',
      }));
      Store.dispatch(shepherdMMRequest({
        method: 'getprices',
        mapToProp: 'prices',
      }));
      Store.dispatch(shepherdMMRequest({
        method: 'swapstatus',
        mapToProp: 'swaps',
      }));

      mainWindow.getMMCacheData()
      .then((res) => {
        console.warn('mm cache', res);

        const { rates, coins, isAuth, swaps, asks, bids, pair, coinsHelper, electrumServersList } = res;
        Store.dispatch(shepherdMMCachePreloadState(isAuth, asks, bids, pair, coins, swaps, rates, coinsHelper, electrumServersList));
      });
    } else {
      console.warn('dex');
    }
  }

  startMM() {

  }

  stopMM() {
    shepherdMMStop()
    .then((res) => {
      Store.dispatch(shepherdMMResetState());
    });
  }

  restartMM() {

  }

  dashboardChangeSection(sectionName) {
    mainWindow.activeSection = sectionName;
    Store.dispatch(dashboardChangeSection(sectionName));
  }

  render() {
    if ((this.props.Dashboard &&
        this.props.Dashboard.activeSection === 'dex') ||
        mainWindow.argv.indexOf('dexonly') > -1) {
      return (
        <div className="dex">
          <content className="app content-container">
            <ul className="growler"></ul>
            <header className="window-header">
              <ul>
                <li className="window__controls_left">
                  <button
                    onClick={ () => this.dashboardChangeSection('wallets') }
                    className="action danger green">Back to wallets</button>
                </li>
                <li className="window__controls_left">
                  <button className="action dark">Start MM</button>
                  <button
                    onClick={ this.stopMM }
                    className="action dark">Stop MM</button>
                  <button className="action dark">Restart MM</button>
                  </li>
                <li className="window__title">
                  <i className="window-header-logo">
                    <SVGFaviconWhite />
                  </i>
                  <h1>
                    Barter <strong>DEX</strong>
                  </h1>
                  <small className="window-header-appversion">version 1.3.5</small>
                </li>
                <li className="window__controls_right">
                  <button className="action danger">logout</button>
                </li>
              </ul>
            </header>
            <section className="app-view">
              { this.props.Dex &&
                this.props.Dex.isAuth &&
                <DexCoins />
              }
              { this.props.Dex &&
                !this.props.Dex.isAuth &&
                <DexLogin />
              }
              <DexNotifier />
            </section>
            <footer className="window-footer window-footer__visible"></footer>
          </content>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    Dashboard: state.Dashboard,
    Dex: state.Dex,
  };
};

export default connect(mapStateToProps)(DexMain);
