import React from 'react';
import ReactTooltip from 'react-tooltip';
import translate from '../../../translate/translate';
import ReactTable from 'react-table';
import TablePaginationRenderer from './pagination';
import formatValue from '../../../util/formatValue';
import Config from '../../../config';
import Spinner from '../spinner/spinner';

export const TxConfsRender = function(confs) {
  if (Number(confs) > -1) {
    return (
      <span>{ confs }</span>
    );
  } else {
    return (
      <span>
        <i
          className="icon fa-warning color-warning margin-right-5"
          data-tip={ translate('DASHBOARD.FAILED_TX_INFO') }></i>
        <ReactTooltip
          effect="solid"
          className="text-left" />
      </span>
    );
  }
}

export const AddressTypeRender = function() {
  return (
    <span>
      <span className="label label-default">
        <i className="icon fa-eye"></i>&nbsp;
        { translate('IAPI.PUBLIC_SM') }
      </span>
    </span>
  );
};

export const TransactionDetailRender = function(transactionIndex) {
  return (
    <button
      type="button"
      className="btn btn-xs white btn-info waves-effect waves-light btn-kmdtxid"
      onClick={ () => this.toggleTxInfoModal(!this.props.ActiveCoin.showTransactionInfo, transactionIndex) }>
      <i className="icon fa-search"></i>
    </button>
  );
};

export const AddressRender = function(tx) {
  if (!tx.address) {
    return (
      <span>
        { /*<i className="icon fa-bullseye"></i>&nbsp; */ }
        <span className="label label-dark">
          { translate('DASHBOARD.ZADDR_NOT_LISTED') }
        </span>
      </span>
    );
  }

  return tx.address;
};

export const AddressItemRender = function(address, type, amount, coin) {
  return (
    <li
      key={ address }
      className={ address === this.state.currentAddress ? 'selected' : '' }>
      <a onClick={ () => this.updateAddressSelection(address) }>
        <i className={ 'icon fa-eye' + (type === 'public' ? '' : '-slash') }></i>&nbsp;&nbsp;
        <span className="text">[ { amount } { coin } ]  { address }</span>
        <span className="glyphicon glyphicon-ok check-mark"></span>
      </a>
    </li>
  );
};

export const AddressListRender = function() {
  const isMultiPublicAddress = this.props.ActiveCoin.addresses && this.props.ActiveCoin.addresses.public && this.props.ActiveCoin.addresses.public.length > 1;
  const isMultiPrivateAddress = this.props.ActiveCoin.addresses && this.props.ActiveCoin.addresses.private && this.props.ActiveCoin.addresses.private.length > 1;

  if (isMultiPublicAddress ||
      isMultiPrivateAddress) {
    return (
      <div className={ `btn-group bootstrap-select form-control form-material showkmdwalletaddrs show-tick margin-bottom-10${(this.state.addressSelectorOpen ? ' open ' : '')}` }>
        <button
          type="button"
          className="btn dropdown-toggle btn-info"
          data-tip={ `${translate('KMD_NATIVE.SELECT_ADDRESS')}` }
          onClick={ this.openDropMenu }>
          <span className="filter-option pull-left">{ this.renderSelectorCurrentLabel() } </span>&nbsp;
          <span className="bs-caret">
            <span className="caret"></span>
          </span>
        </button>
        <ReactTooltip
          effect="solid"
          className="text-left" />
        <div className="dropdown-menu open">
          <ul className="dropdown-menu inner">
            <li className="no--hover">
              <a><span className="text">{ translate('KMD_NATIVE.SELECT_ADDRESS') }</span></a>
            </li>
            <li className={ !this.state.currentAddress ? 'selected' : '' }>
              <a onClick={ () => this.updateAddressSelection('') }>
                <span className="text">{ translate('INDEX.ALL') }</span>
                <span className="glyphicon glyphicon-ok check-mark"></span>
              </a>
            </li>
            { this.renderAddressByType('public') }
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export const TxTypeRender = function(category) {
  if (category === 'send' ||
      category === 'sent') {
    return (
      <span className="label label-danger">
        <i className="icon fa-arrow-circle-left"></i> <span>{ translate('DASHBOARD.OUT') }</span>
      </span>
    );
  } else if (category === 'receive' ||
      category === 'received') {
    return (
      <span className="label label-success">
        <i className="icon fa-arrow-circle-right"></i> <span>{ translate('DASHBOARD.IN') } &nbsp; &nbsp;</span>
      </span>
    );
  } else if (category === 'generate') {
    return (
      <span>
        <i className="icon fa-cogs"></i> <span>{ translate('DASHBOARD.MINED') }</span>
      </span>
    );
  } else if (category === 'immature') {
    return (
      <span>
        <i className="icon fa-clock-o"></i> <span>{ translate('DASHBOARD.IMMATURE') }</span>
      </span>
    );
  } else if (category === 'unknown') {
    return (
      <span>
        <i className="icon fa-meh-o"></i> <span>{ translate('DASHBOARD.UNKNOWN') }</span>
      </span>
    );
  } else if (category === 'self') {
    return (
      <span className="label label-info self-send">
        <span>self</span>
      </span>
    );
  }
};

export const TxAmountRender = function(tx) {
  let _amountNegative;

  if ((tx.category === 'send' ||
      tx.category === 'sent') ||
      (tx.type === 'send' ||
      tx.type === 'sent')) {
    _amountNegative = -1;
  } else {
    _amountNegative = 1;
  }

  if (Config.roundValues) {
    return (
      <span>
        <span data-tip={ tx.amount * _amountNegative }>
          { Math.abs(tx.interest) !== Math.abs(tx.amount) ? (formatValue(tx.amount) * _amountNegative || translate('DASHBOARD.UNKNOWN')) : '' }
          { tx.interest &&
            <span
              className="tx-interest"
              data-tip={ `${translate('DASHBOARD.SPV_CLAIMED_INTEREST')} ${formatValue(Math.abs(tx.interest))}` }>+{ formatValue(Math.abs(tx.interest)) }</span>
          }
          { tx.interest &&
            <ReactTooltip
              effect="solid"
              className="text-left" />
          }
        </span>
        <ReactTooltip
          effect="solid"
          className="text-left" />
      </span>
    );
  }

  return (
    <span>
      { Math.abs(tx.interest) !== Math.abs(tx.amount) ? (tx.amount * _amountNegative || translate('DASHBOARD.UNKNOWN')) : '' }
      { tx.interest &&
        <span
          className="tx-interest"
          data-tip={ `${translate('DASHBOARD.SPV_CLAIMED_INTEREST')} ${Math.abs(tx.interest)}` }>+{ Math.abs(tx.interest) }</span>
      }
      { tx.interest &&
        <ReactTooltip
          effect="solid"
          className="text-left" />
      }
    </span>
  );
};

export const TxHistoryListRender = function() {
  return (
    <ReactTable
      data={ this.state.filteredItemsList }
      columns={ this.state.itemsListColumns }
      minRows="0"
      sortable={ true }
      className="-striped -highlight"
      PaginationComponent={ TablePaginationRenderer }
      nextText={ translate('INDEX.NEXT_PAGE') }
      previousText={ translate('INDEX.PREVIOUS_PAGE') }
      showPaginationBottom={ this.state.showPagination }
      pageSize={ this.state.pageSize }
      defaultSortMethod={ this.tableSorting }
      defaultSorted={[{ // default sort
        id: 'timestamp',
        desc: true,
      }]}
      onPageSizeChange={ (pageSize, pageIndex) => this.onPageSizeChange(pageSize, pageIndex) } />
  );
};

export const WalletsDataRender = function() {
  return (
    <span>
      <div id="edexcoin_dashboardinfo">
        { (this.displayClaimInterestUI() === 777 || this.displayClaimInterestUI() === -777) &&
          <div className="col-xs-12 margin-top-20 backround-gray">
            <div className="panel no-margin">
              <div>
                <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                  <div className="panel no-margin padding-top-10 padding-bottom-10 center">
                    { this.displayClaimInterestUI() === 777 &&
                      <div>
                        { translate('DASHBOARD.CLAIM_INTEREST_HELPER_BAR_P1') } <strong>{ this.props.ActiveCoin.balance.interest }</strong> KMD { translate('DASHBOARD.CLAIM_INTEREST_HELPER_BAR_P2') }.
                        <button
                          type="button"
                          className="btn btn-success waves-effect waves-light dashboard-claim-interest-btn"
                          onClick={ this.openClaimInterestModal }>
                          <i className="icon fa-dollar"></i> { translate('DASHBOARD.CLAIM_INTEREST_HELPER_BAR_P3') }
                        </button>
                      </div>
                    }
                    { this.displayClaimInterestUI() === -777 &&
                      <div>
                        { translate('DASHBOARD.CLAIM_INTEREST_HELPER_BAR_ALT_P1') }.
                        <button
                          type="button"
                          className="btn btn-success waves-effect waves-light dashboard-claim-interest-btn"
                          onClick={ this.openClaimInterestModal }>
                          <i className="icon fa-search"></i> { translate('DASHBOARD.CLAIM_INTEREST_HELPER_BAR_ALT_P2') }
                        </button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="col-xs-12 margin-top-20 backround-gray">
          <div className="panel nav-tabs-horizontal">
            <div>
              <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                <div className="panel">
                  <header className="panel-heading z-index-10">
                    { this.state.loading &&
                      <span className="spinner--small">
                        <Spinner />
                      </span>
                    }
                    { !this.state.loading &&
                      <i
                        className="icon fa-refresh manual-txhistory-refresh pointer"
                        onClick={ this.refreshTxHistory }></i>
                    }
                    <h4 className="panel-title">{ translate('INDEX.TRANSACTION_HISTORY') }</h4>
                  </header>
                  <div className="panel-body">
                    <div className="row padding-bottom-30 padding-top-10">
                      { this.props.ActiveCoin.txhistory !== 'loading' &&
                        this.props.ActiveCoin.txhistory !== 'no data' &&
                        this.props.ActiveCoin.txhistory !== 'connection error' &&
                        this.props.ActiveCoin.txhistory !== 'connection error or incomplete data' &&
                        this.props.ActiveCoin.txhistory !== 'cant get current height' &&
                        <div className="col-sm-4 search-box">
                          <input
                            className="form-control"
                            onChange={ e => this.onSearchTermChange(e.target.value) }
                            placeholder={ translate('DASHBOARD.SEARCH') } />
                        </div>
                      }
                    </div>
                    <div className="row">
                      { this.renderTxHistoryList() }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};