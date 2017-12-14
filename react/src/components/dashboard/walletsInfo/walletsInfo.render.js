import React from 'react';
import { translate } from '../../../translate/translate';
import { secondsToString } from '../../../util/time';
import formatBytes from '../../../util/formatBytes';

const WalletsInfoRender = function() {
  if (this.props.ActiveCoin.mode === 'native') {
    const _progress = this.props.ActiveCoin.progress;
    const _netTotals = this.props.ActiveCoin.net.totals;
    const _netPeers = this.props.ActiveCoin.net.peers;
    let _peerItems = [];

    if (_netPeers) {
      for (let i = 0; i < _netPeers.length; i++) {
        _peerItems.push(
          <table
            key={ `native-net-peers-${i}` }
            className="table table-striped">
            <tbody>
              <tr>
                <td>{ _netPeers[i].id }</td>
                <td></td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  { _netPeers[i].addr }
                </td>
              </tr>
              <tr>
                <td>Address local</td>
                <td>
                  { _netPeers[i].addrlocal }
                </td>
              </tr>
              <tr>
                <td>Services</td>
                <td>
                  { _netPeers[i].services }
                </td>
              </tr>
              <tr>
                <td>Version</td>
                <td>
                  { _netPeers[i].version }
                </td>
              </tr>
              <tr>
                <td>Subversion</td>
                <td>
                  { _netPeers[i].subver }
                </td>
              </tr>
              <tr>
                <td>Whitelisted</td>
                <td>
                  { _netPeers[i].whitelisted ? 'true' : 'false' }
                </td>
              </tr>
              <tr>
                <td>Inbound</td>
                <td>
                  { _netPeers[i].inbound ? 'true' : 'false' }
                </td>
              </tr>
              <tr>
                <td>Time offset</td>
                <td>
                  { _netPeers[i].timeoffset }
                </td>
              </tr>
              <tr>
                <td>Ping time</td>
                <td>
                  { _netPeers[i].pingtime }
                </td>
              </tr>
              <tr>
                <td>Connection time</td>
                <td>
                  { secondsToString(_netPeers[i].conntime) }
                </td>
              </tr>
              <tr>
                <td>Last send</td>
                <td>
                  { secondsToString(_netPeers[i].lastsend) }
                </td>
              </tr>
              <tr>
                <td>Last received</td>
                <td>
                  { secondsToString(_netPeers[i].lastrecv) }
                </td>
              </tr>
              <tr>
                <td>Data sent</td>
                <td>
                  { formatBytes(_netPeers[i].bytessent) }
                </td>
              </tr>
              <tr>
                <td>Data received</td>
                <td>
                  { formatBytes(_netPeers[i].bytesrecv) }
                </td>
              </tr>
              <tr>
                <td>Ban score</td>
                <td>
                  { _netPeers[i].banscore }
                </td>
              </tr>
              <tr>
                <td>Starting height</td>
                <td>
                  { _netPeers[i].startingheight }
                </td>
              </tr>
              <tr>
                <td>Synced headers</td>
                <td>
                  { _netPeers[i].synced_headers }
                </td>
              </tr>
              <tr>
                <td>Synced blocks</td>
                <td>
                  { _netPeers[i].synced_blocks }
                </td>
              </tr>
              <tr>
                <td>Synced blocks</td>
                <td>
                  { _netPeers[i].synced_blocks }
                </td>
              </tr>
              <tr>
                <td style={{ background: '#fff' }}>&nbsp;</td>
                <td style={{ background: '#fff' }}>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        );
      }
    }

    return (
      <div>
        <div className="col-xlg-6 col-md-4">
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">{ translate('INDEX.WALLET_INFO') }</h3>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>{ translate('INDEX.WALLET_VERSION') }</td>
                    <td>
                      { _progress.walletversion }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.BALANCE') }</td>
                    <td>
                      { _progress.balance }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.UNCONFIRMED_BALANCE') }</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.IMMATURE_BALANCE') }</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.TOTAL_TX_COUNT') }</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          { this.props.ActiveCoin.coin === 'KMD' &&
            this.displayClaimInterestUI() &&
            <div>
              <button
                type="button"
                className="btn btn-success waves-effect waves-light margin-top-20 btn-next"
                onClick={ () => this.openClaimInterestModal() }>
                  <i className="icon fa-dollar"></i> { translate('CLAIM_INTEREST.CLAIM_INTEREST', ' ') }
                </button>
            </div>
          }
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">Network totals</h3>
            </div>
            <div className="table-responsive">
              { _netTotals &&
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Time</td>
                      <td>
                        { secondsToString(_netTotals.timemillis, true) }
                      </td>
                    </tr>
                    <tr>
                      <td>Data received</td>
                      <td>
                        { formatBytes(_netTotals.totalbytesrecv) }
                      </td>
                    </tr>
                    <tr>
                      <td>Data sent</td>
                      <td>
                        { formatBytes(_netTotals.totalbytessent) }
                      </td>
                    </tr>
                  </tbody>
                </table>
              }
              { !_netTotals &&
                <div>Loading...</div>
              }
            </div>
          </div>
        </div>
        <div className="col-xlg-6 col-md-8">
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">
                { this.props.ActiveCoin.coin === 'KMD' ? 'Komodo' : `${this.props.ActiveCoin.coin}` } { translate('INDEX.INFO') }
              </h3>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>{ translate('INDEX.VERSION') }</td>
                    <td>
                      { _progress.KMDversion }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.PROTOCOL_VERSION') }</td>
                    <td>
                      { _progress.protocolversion }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.NOTARIZED') }</td>
                    <td>
                      { _progress.notarized }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      { translate('INDEX.NOTARIZED') } { translate('INDEX.HASH') }
                    </td>
                    <td>
                      { _progress.notarizedhash ?
                        _progress.notarizedhash.substring(
                          0,
                          Math.floor(_progress.notarizedhash.length / 2)
                        ) +
                        '\t' +
                        _progress.notarizedhash.substring(
                          Math.floor(_progress.notarizedhash.length / 2),
                          _progress.notarizedhash.length
                        )
                        : ''
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      { translate('INDEX.NOTARIZED') } BTC
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.BLOCKS') }</td>
                    <td>
                      { _progress.blocks }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.CONNECTIONS') }</td>
                    <td>
                      { _progress.connections }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.DIFFICULTY') }</td>
                    <td>
                      { _progress.difficulty }
                    </td>
                  </tr>
                  <tr>
                    <td>Testnet</td>
                    <td>
                      { _progress.testnet }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.PAY_TX_FEE') }</td>
                    <td>
                      { _progress.paytxfee }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.RELAY_FEE') }</td>
                    <td>
                      { _progress.relayfee }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.ERRORS') }</td>
                    <td>
                      { _progress.errors }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xlg-12 col-md-12">
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">
                Peers
              </h3>
            </div>
            { !_netPeers &&
              <div>Loading...</div>
            }
            { _netPeers &&
              <div className="table-responsive">
                { _peerItems }
              </div>
            }
          </div>
        </div>
      </div>
    );
  } else if (this.props.ActiveCoin.mode === 'spv') {
    const _balance = this.props.ActiveCoin.balance;
    const _server = this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin];

    return (
      <div>
        <div className="col-xlg-6 col-md-6">
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">{ translate('INDEX.WALLET_INFO') }</h3>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>{ translate('INDEX.SPV_SERVER_IP') }</td>
                    <td>
                      { _server.server.ip }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.SPV_SERVER_PORT') }</td>
                    <td>
                      { _server.server.port }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.SPV_SERVER_CON_TYPE') }</td>
                    <td>
                      TCP
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.PAY_TX_FEE') }</td>
                    <td>
                      { _server.txfee }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.BALANCE') }</td>
                    <td>
                      { _balance.balance }
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('INDEX.UNCONFIRMED_BALANCE') }</td>
                    <td>
                      { _balance.uncomfirmed }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          { this.props.ActiveCoin.coin === 'KMD' &&
            this.props.ActiveCoin.mode !== 'spv' &&
            <div>
              <button
                type="button"
                className="btn btn-success waves-effect waves-light margin-top-20 btn-next"
                onClick={ () => this.openClaimInterestModal() }>{ translate('CLAIM_INTEREST.CLAIM_INTEREST', ' ') }</button>
              <ClaimInterestModal />
            </div>
          }
        </div>
      </div>
    );
  }
};

export default WalletsInfoRender;