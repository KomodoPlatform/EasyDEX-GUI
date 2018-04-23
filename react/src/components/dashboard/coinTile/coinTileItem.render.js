import React from 'react';
import translate from '../../../translate/translate';
import ReactTooltip from 'react-tooltip';

const CoinTileItemRender = function() {
  const { item } = this.props;

  return (
    <div className="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info pointer">
      <span className={ `badge up badge-${item.modecolor}` }>
        { item.modecode }
      </span>
      <div className={ 'widget widget-shadow' + (this.props.ActiveCoin.coin === item.coin ? ' active' : '') }>
        <div
          className="widget-content text-center bg-white padding-20"
          onClick={ () => this._dashboardChangeActiveCoin(item.coin, item.mode) }>
          <a className="avatar margin-bottom-5">
            <img
              className="img-responsive"
              src={ `assets/images/cryptologo/${item.coinlogo.toLowerCase()}.png` }
              alt={ item.coinname }/>
          </a>
          <div className="coin-name">
            { item.coinname } ({ item.coinlogo.toUpperCase() })
          </div>
        </div>
      </div>
      <button
        onClick={ () => this.toggleCoinMenu(item.coin) }
        className="btn btn-default btn-xs clipboard-edexaddr coin-tile-context-menu-trigger coind-actions-menu">
        <i
          data-tip={ translate('INDEX.TOGGLE_COIN_CONTEXT_MENU') }
          className="fa fa-ellipsis-v coin-tile-context-menu-trigger"></i>
        <ReactTooltip
          effect="solid"
          className="text-left" />
      </button>
      { this.state.toggledCoinMenu &&
        this.state.toggledCoinMenu === item.coin &&
        <div className="coin-tile-context-menu">
          <ul>
            { this.renderStopCoinButton() &&
              item.mode === 'native' &&
              <li onClick={ () => this.stopCoind(item.coin, item.mode) }>
                <i className="icon fa-stop-circle margin-right-5"></i> { translate('DASHBOARD.STOP') }
              </li>
            }
            { this.renderRemoveCoinButton() &&
              <li onClick={ () => this.removeCoin(item.coin, item.mode) }>
                <i className="icon fa-trash-o margin-right-5"></i> { translate('DASHBOARD.REMOVE') }
              </li>
            }
          </ul>
        </div>
      }
      { this.props.Dashboard &&
        this.props.Dashboard.electrumCoins &&
        this.props.Dashboard.electrumCoins[item.coin] &&
        this.props.Dashboard.electrumCoins[item.coin].serverList &&
        this.props.Dashboard.electrumCoins[item.coin].serverList === 'none' &&
        <span>
          <i
            data-tip={ translate('SETTINGS.SPV_SINGLE_SERVER_NOTICE') }
            className="icon fa-info-circle icon-spv-connection-warning"></i>
          <ReactTooltip
            effect="solid"
            className="text-left" />
        </span>
      }
      { this.renderCoinConError(item) &&
        !this.props.ActiveCoin.rescanInProgress &&
        <span>
          <i
            onClick={ this.openCoindDownModal }
            data-tip={ `${translate('DASHBOARD.RPC_CONN_FAILURE')}: ${this.props.ActiveCoin.getinfoFetchFailures}.` }
            className="icon fa-warning icon-native-connection-warning"></i>
          <ReactTooltip
            effect="solid"
            className="text-left" />
        </span>
      }
    </div>
  );
};

export default CoinTileItemRender;