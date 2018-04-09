import React from 'react';
import ReactTooltip from 'react-tooltip';
import translate from '../../../translate/translate';
import Spinner from '../spinner/spinner';
import Config from '../../../config';

const WalletsBalanceRender = function() {
  return (
    <div
      id="wallet-widgets"
      className="wallet-widgets">
      { this.renderBalance('transparent') !== -777 &&
        <div className="col-xs-12 flex">
          <div className={
            this.props.ActiveCoin.coin === 'CHIPS' ||
            (this.props.ActiveCoin.mode === 'spv' && this.props.ActiveCoin.coin !== 'KMD') ||
            this.renderBalance('total') === this.renderBalance('transparent') ||
            this.renderBalance('total') === 0 ? 'col-lg-12 col-xs-12 balance-placeholder--bold' : 'col-lg-3 col-xs-12'
          }>
            <div className="widget widget-shadow">
              <div className="widget-content">
                { this.state.loading &&
                  <span className="spinner--small">
                    <Spinner />
                  </span>
                }
                { !this.state.loading &&
                  <i
                    className="icon fa-refresh manual-balance-refresh pointer"
                    onClick={ this.refreshBalance }></i>
                }
                <div className="padding-20 padding-top-10">
                  <div className="clearfix cursor-default">
                    <div className="pull-left padding-vertical-10">
                      { this.props.ActiveCoin.coin !== 'CHIPS' &&
                        this.props.ActiveCoin.mode !== 'spv' &&
                        <i className="icon fa-eye font-size-24 vertical-align-bottom margin-right-5"></i>
                      }
                      { this.props.ActiveCoin.mode === 'spv' &&
                        Number(this.renderBalance('interest')) > 0 &&
                        <span className="padding-right-30">&nbsp;</span>
                      }
                      { this.props.ActiveCoin.coin === 'CHIPS' || this.props.ActiveCoin.mode === 'spv' ? translate('INDEX.BALANCE') : translate('INDEX.TRANSPARENT_BALANCE') }
                    </div>
                    <span
                      className="pull-right padding-top-10 font-size-22">
                      { this.renderBalance('transparent', true) }
                      <ReactTooltip
                        effect="solid"
                        className="text-left" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={ (this.props.ActiveCoin.mode === 'native' && Number(this.renderBalance('private'))) > 0 ? 'col-lg-3 col-xs-12' : 'hide' }>
            <div className="widget widget-shadow">
              <div className="padding-20 padding-top-10">
                <div className="clearfix cursor-default">
                  <div className="pull-left padding-vertical-10">
                    <i className="icon fa-eye-slash font-size-24 vertical-align-bottom margin-right-5"></i>
                    { translate('INDEX.Z_BALANCE') }
                  </div>
                  <span
                    className="pull-right padding-top-10 font-size-22"
                    data-tip={ Config.roundValues ? this.renderBalance('private') : '' }>
                    { this.renderBalance('private', true) }
                  </span>
                  <ReactTooltip
                    effect="solid"
                    className="text-left" />
                </div>
              </div>
            </div>
          </div>

          <div className={ this.props.ActiveCoin.coin === 'KMD' && Number(this.renderBalance('interest')) > 0 ? 'col-lg-3 col-xs-12' : 'hide' }>
            <div className="widget widget-shadow">
              <div className="widget-content">
                <div className="padding-20 padding-top-10">
                  <div className="clearfix cursor-default">
                    <div className="pull-left padding-vertical-10">
                      <i className="icon fa-money font-size-24 vertical-align-bottom margin-right-5"></i>
                      { translate('INDEX.INTEREST_EARNED') }
                    </div>
                    <span
                      className="pull-right padding-top-10 font-size-22"
                      data-tip={ Config.roundValues ? this.renderBalance('interest') : '' }>
                      { this.renderBalance('interest', true) }
                    </span>
                    <ReactTooltip
                      effect="solid"
                      className="text-left" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={
            this.props.ActiveCoin.coin === 'CHIPS' ||
            (this.props.ActiveCoin.coin !== 'KMD' && this.props.ActiveCoin.mode === 'spv') ||
            Number(this.renderBalance('total')) === 0 ||
            this.renderBalance('total') === this.renderBalance('transparent') ? 'hide' : 'col-lg-3 col-xs-12'
          }>
            <div className="widget widget-shadow">
              <div className="widget-content">
                <div className="padding-20 padding-top-10">
                  <div className="clearfix cursor-default">
                    <div className="pull-left padding-vertical-10">
                      <i className="icon fa-bullseye font-size-24 vertical-align-bottom margin-right-5"></i>
                      { translate('INDEX.TOTAL_BALANCE') }
                    </div>
                    <span
                      className="pull-right padding-top-10 font-size-22"
                      data-tip={ Config.roundValues ? this.renderBalance('total') : '' }>
                      { this.renderBalance('total', true) }
                    </span>
                    <ReactTooltip
                      effect="solid"
                      className="text-left" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default WalletsBalanceRender;