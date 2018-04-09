import React from 'react';
import translate from '../../../translate/translate';
import Spinner from '../spinner/spinner';
import ReactTooltip from 'react-tooltip';

export const _ClaimInterestTableRender = function() {
  const _transactionsList = this.state.transactionsList;
  let _items = [];

  for (let i = 0; i < _transactionsList.length; i++) {
    if ((_transactionsList[i].interest === 0 && this.state.showZeroInterest) ||
        (_transactionsList[i].amount > 0 && _transactionsList[i].interest > 0)) {
      _items.push(
        <tr key={ `${_transactionsList[i].txid}-${_transactionsList[i].address}-${i}` }>
          <td>
            <button
              className="btn btn-default btn-xs clipboard-edexaddr copy-string-btn"
              title={ translate('INDEX.COPY_TO_CLIPBOARD') }
              onClick={ () => this.copyTxId(_transactionsList[i].txid) }>
                <i className="icon wb-copy"></i> { translate('INDEX.COPY') + ' TXID' }
            </button>
          </td>
          <td>{ _transactionsList[i].address }</td>
          <td className={ _transactionsList[i].amount > 10 ? 'green bold' : '' }>{ _transactionsList[i].amount }</td>
          <td>{ _transactionsList[i].interest }</td>
          <td className="locktime center">
            { _transactionsList[i].locktime &&
              <i
                data-tip={ `Locktime is set to ${_transactionsList[i].locktime}` }
                className="fa-check-circle green"></i>
            }
            { !_transactionsList[i].locktime &&
              <i
                data-tip={ `Locktime is unset! Your UTXO is not accruing interest.` }
                className="fa-exclamation-circle red"></i>
            }
            <ReactTooltip
              effect="solid"
              className="text-left" />
          </td>
        </tr>
      );
    }
  }

  return (
    <span>
      <div>
        <p>
          <strong>{ translate('CLAIM_INTEREST.REQ_P1') }:</strong> { translate('CLAIM_INTEREST.REQ_P2') } <strong>10 KMD</strong>
        </p>
        <p>
          <strong>{ translate('CLAIM_INTEREST.TIP') }:</strong> { translate('CLAIM_INTEREST.TIP_DESC') }
        </p>
        { this.props.ActiveCoin &&
          this.props.ActiveCoin.mode === 'native' &&
          <p>
            <strong>{ translate('CLAIM_INTEREST.NOTICE') }:</strong> { translate('CLAIM_INTEREST.NATIVE_INTEREST_CHANGE_DESC') }
          </p>
        }
        <p>
          <strong>Claim interest fee:</strong> 0.0001 KMD (10000 sats).
        </p>
      </div>
      { this.state.totalInterest > 0 &&
        <div className={ 'text-left padding-bottom-20' + (this.state.displayShowZeroInterestToggle ? ' padding-top-40' : '') }>
          { this.state.displayShowZeroInterestToggle &&
            <span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={ this.state.showZeroInterest } />
                <div
                  className="slider"
                  onClick={ this.toggleZeroInterest }></div>
              </label>
              <div
                className="toggle-label margin-right-15 pointer"
                onClick={ this.toggleZeroInterest }>
                { translate('CLAIM_INTEREST.SHOW_ZERO_INTEREST') }
              </div>
            </span>
          }
          { !this.state.spvVerificationWarning &&
            <button
              type="button"
              className="btn btn-success waves-effect waves-light claim-btn"
              onClick={ () => this.claimInterest() }
              disabled={ this.state.spvPreflightSendInProgress }>
              { !this.state.spvPreflightSendInProgress &&
                <i className="icon fa-dollar margin-right-5"></i>
              }
              { !this.state.spvPreflightSendInProgress &&
                <span>{ translate('CLAIM_INTEREST.CLAIM_INTEREST', `${this.state.totalInterest} KMD `) }</span>
              }
              { this.state.spvPreflightSendInProgress &&
                <span>{ translate('SEND.SPV_VERIFYING') }...</span>
              }
            </button>
          }
          { this.state.spvVerificationWarning &&
            <div className="padding-top-10 padding-bottom-10 fs-15">
              <strong className="color-warning">{ translate('SEND.WARNING') }:</strong> { translate('SEND.WARNING_SPV_P1') } { translate('SEND.WARNING_SPV_P2') }
              <div className="margin-top-15">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={ this.confirmClaimInterest }>
                    { translate('INDEX.CONFIRM') }
                </button>
                <button
                  type="button"
                  className="btn btn-primary margin-left-15"
                  onClick={ this.cancelClaimInterest }>
                    Cancel
                </button>
              </div>
            </div>
          }
          { this.props.ActiveCoin.mode === 'native' &&
            this.state.addressses &&
            Object.keys(this.state.addressses).length > 0 &&
            <div className="margin-top-40 margin-bottom-20">
              <div className="margin-bottom-5">Send my balance to</div>
              { this.addressDropdownRender() }
            </div>
          }
          { (!this.isFullySynced() || !navigator.onLine) &&
            this.props.ActiveCoin &&
            this.props.ActiveCoin.mode === 'native' &&
            <div className="col-lg-12 padding-top-5 padding-bottom-35 send-coin-sync-warning">
              <i className="icon fa-warning color-warning margin-right-5"></i> <span className="desc">{ translate('SEND.SEND_NATIVE_SYNC_WARNING') }</span>
            </div>
          }
        </div>
      }
      <div className="table-scroll">
        <table className="table table-hover dataTable table-striped">
          <thead>
            <tr>
              <th></th>
              <th>{ translate('INDEX.ADDRESS') }</th>
              <th>{ translate('INDEX.AMOUNT') }</th>
              <th>{ translate('INDEX.INTEREST') }</th>
              <th>Locktime</th>
            </tr>
          </thead>
          <tbody>
          { _items }
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>{ translate('INDEX.ADDRESS') }</th>
              <th>{ translate('INDEX.AMOUNT') }</th>
              <th>{ translate('INDEX.INTEREST') }</th>
              <th>Locktime</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </span>
  );
};

export const ClaimInterestModalRender = function() {
  return (
    <span onClick={ this.closeDropMenu }>
      <div className={ 'modal modal-claim-interest modal-3d-sign ' + (this.state.open ? 'show in' : 'fade hide') }>
        <div
          onClick={ this.closeModal }
          className="modal-close-overlay"></div>
        <div className="modal-dialog modal-center modal-sm">
          <div
            onClick={ this.closeModal }
            className="modal-close-overlay"></div>
          <div className="modal-content">
            <div className="modal-header bg-orange-a400 wallet-send-header">
              <button
                type="button"
                className="close white"
                onClick={ this.closeModal }>
                <span>×</span>
              </button>
              <h4 className="modal-title white text-left">{ translate('CLAIM_INTEREST.CLAIM_INTEREST', ' ') }</h4>
            </div>
            <div className="modal-body">
              { this.state.loading &&
                <span className="spinner--medium">
                  <Spinner />
                </span>
              }
              { !this.state.loading &&
                <i
                  className="icon fa-refresh pointer refresh-icon"
                  onClick={ this.loadListUnspent }></i>
              }
              <div className="animsition vertical-align fade-in">
                <div className="page-content vertical-align-middle full-width">
                  { this.state.isLoading &&
                    <span>{ translate('INDEX.LOADING') }...</span>
                  }
                  { !this.state.isLoading &&
                    this.checkTransactionsListLength() &&
                    <div>{ this.claimInterestTableRender() }</div>
                  }
                  { !this.state.isLoading &&
                    !this.checkTransactionsListLength() &&
                    <div>{ translate('INDEX.NO_DATA') }</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={ 'modal-backdrop ' + (this.state.open ? 'show in' : 'fade hide') }></div>
    </span>
  );
};