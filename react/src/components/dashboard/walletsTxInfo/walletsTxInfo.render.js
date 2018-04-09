import React from 'react';
import translate from '../../../translate/translate';
import { secondsToString } from '../../../util/time';
import Config from '../../../config';
import explorerList from '../../../util/explorerList';

const WalletsTxInfoRender = function(txInfo) {
  return (
    <div onKeyDown={ (event) => this.handleKeydown(event) }>
      <div
        className="modal show"
        id="kmd_txid_info_mdl">
        <div
          onClick={ this.toggleTxInfoModal }
          className="modal-close-overlay"></div>
        <div className="modal-dialog modal-center modal-lg">
          <div
            onClick={ this.toggleTxInfoModal }
            className="modal-close-overlay"></div>
          <div className="modal-content">
            <div className="modal-body modal-body-container">
              <div className="panel nav-tabs-horizontal">
                <ul className="nav nav-tabs nav-tabs-line">
                  <li className={ this.state.activeTab === 0 ? 'active' : '' }>
                    <a onClick={ () => this.openTab(0) }>
                      <i className="icon md-balance-wallet"></i>TxID Info
                    </a>
                  </li>
                  <li className={ this.state.activeTab === 1 ? 'hide active' : 'hide' }>
                    <a onClick={ () => this.openTab(1) }>
                      <i className="icon md-plus-square"></i>Vjointsplits, Details
                    </a>
                  </li>
                  <li className={ this.state.activeTab === 2 ? 'active' : '' }>
                    <a onClick={ () => this.openTab(2) }>
                      <i className="icon wb-briefcase"></i>Hex
                    </a>
                  </li>
                  <li className={ this.state.activeTab === 3 ? 'active' : '' }>
                    <a onClick={ () => this.openTab(3) }>
                      <i className="icon wb-file"></i>Raw info
                    </a>
                  </li>
                </ul>
                <div className="panel-body">
                  { this.state.txDetails &&
                    <div className="tab-content">
                      { this.state.activeTab === 0 &&
                        <div className="tab-pane active">
                          <table className="table table-striped">
                            <tbody>
                              <tr>
                                <td>{ this.capitalizeFirstLetter(translate('TX_INFO.ADDRESS')) }</td>
                                <td>
                                  { this.props.ActiveCoin.mode === 'spv' ? this.state.txDetails.address : this.state.txDetails.details[0].address }
                                </td>
                              </tr>
                              <tr>
                                <td>{ this.capitalizeFirstLetter(translate('TX_INFO.AMOUNT')) }</td>
                                <td>
                                  { this.props.ActiveCoin.mode === 'spv' ? this.state.txDetails.amount : txInfo.amount }
                                </td>
                              </tr>
                              <tr>
                                <td>{ this.capitalizeFirstLetter(translate('TX_INFO.CATEGORY')) }</td>
                                <td>
                                  { this.props.ActiveCoin.mode === 'spv' ? this.state.txDetails.type : this.state.txDetails.details[0].category || txInfo.type }
                                </td>
                              </tr>
                              <tr>
                                <td>{ this.capitalizeFirstLetter(translate('TX_INFO.CONFIRMATIONS')) }</td>
                                <td>
                                  { this.state.txDetails.confirmations }
                                </td>
                              </tr>
                              { this.state.txDetails.blockindex &&
                                <tr>
                                  <td>{ this.capitalizeFirstLetter('blockindex') }</td>
                                  <td>
                                    { this.state.txDetails.blockindex }
                                  </td>
                                </tr>
                              }
                              { this.state.txDetails.blockhash &&
                                <tr>
                                  <td>{ this.props.ActiveCoin.mode === 'spv' ? this.capitalizeFirstLetter('blockheight') : this.capitalizeFirstLetter('blockhash') }</td>
                                  <td>
                                    { this.props.ActiveCoin.mode === 'spv' ? this.state.txDetails.height : this.state.txDetails.blockhash }
                                  </td>
                                </tr>
                              }
                              { (this.state.txDetails.blocktime || this.state.txDetails.timestamp) &&
                                <tr>
                                  <td>{ this.capitalizeFirstLetter('blocktime') }</td>
                                  <td>
                                    { secondsToString(this.state.txDetails.blocktime || this.state.txDetails.timestamp) }
                                  </td>
                                </tr>
                              }
                              <tr>
                                <td>{ this.capitalizeFirstLetter('txid') }</td>
                                <td>
                                  { this.state.txDetails.txid }
                                </td>
                              </tr>
                              { this.state.txDetails.walletconflicts &&
                                <tr>
                                  <td>{ this.capitalizeFirstLetter('walletconflicts') }</td>
                                  <td>
                                    { this.state.txDetails.walletconflicts.length }
                                  </td>
                                </tr>
                              }
                              <tr>
                                <td>{ this.capitalizeFirstLetter('time') }</td>
                                <td>
                                  { secondsToString(this.props.ActiveCoin.mode === 'spv' ? this.state.txDetails.blocktime : this.state.txDetails.time) }
                                </td>
                              </tr>
                              <tr>
                                <td>{ this.capitalizeFirstLetter('timereceived') }</td>
                                <td>
                                  { secondsToString(this.props.ActiveCoin.mode === 'spv' ? this.state.txDetails.blocktime : this.state.txDetails.timereceived) }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      }
                      { this.state.activeTab === 1 &&
                        <div className="tab-pane active">
                          <table className="table table-striped">
                            <tbody>
                            }
                            <tr>
                              <td>{ this.capitalizeFirstLetter('txid') }</td>
                              <td>
                                { txInfo.txid }
                              </td>
                            </tr>
                            <tr>
                              <td>{ this.capitalizeFirstLetter('walletconflicts') }</td>
                              <td>
                                { txInfo.walletconflicts ? txInfo.walletconflicts.length : '' }
                              </td>
                            </tr>
                            <tr>
                              <td>{ this.capitalizeFirstLetter('vjoinsplit') }</td>
                              <td>
                                { txInfo.vjoinsplit }
                              </td>
                            </tr>
                            <tr>
                              <td>{ this.capitalizeFirstLetter('details') }</td>
                              <td>
                                { txInfo.details }
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      }
                      { this.state.activeTab === 2 &&
                        <div className="tab-pane active">
                          <textarea
                            className="full-width height-400"
                            rows="20"
                            cols="80"
                            defaultValue={ this.state.rawTxDetails.hex }
                            disabled></textarea>
                        </div>
                      }
                      { this.state.activeTab === 3 &&
                        <div className="tab-pane active">
                          <textarea
                            className="full-width height-400"
                            rows="40"
                            cols="80"
                            defaultValue={ JSON.stringify(this.state.rawTxDetails, null, '\t') }
                            disabled></textarea>
                        </div>
                      }
                    </div>
                  }
                  { !this.state.txDetails &&
                    <div>{ translate('INDEX.LOADING') }...</div>
                  }
                </div>
              </div>
            </div>
            <div className="modal-footer">
              { this.state.txDetails &&
                explorerList[this.props.ActiveCoin.coin] &&
                <button
                  type="button"
                  className="btn btn-sm white btn-dark waves-effect waves-light pull-left"
                  onClick={ () => this.openExplorerWindow(this.state.txDetails.txid) }>
                  <i className="icon fa-external-link"></i> { translate('INDEX.OPEN_TRANSACTION_IN_EPLORER', this.props.ActiveCoin.coin) }
                </button>
              }
              <button
                type="button"
                className="btn btn-default"
                onClick={ this.toggleTxInfoModal }>{ translate('INDEX.CLOSE') }</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show in"></div>
    </div>
  );
};

export default WalletsTxInfoRender;