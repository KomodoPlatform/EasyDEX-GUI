import React from 'react';
import translate from '../../../translate/translate';
import addCoinOptionsCrypto from '../../addcoin/addcoinOptionsCrypto';
import addCoinOptionsAC from '../../addcoin/addcoinOptionsAC';
import Select from 'react-select';
import {
  triggerToaster,
  shepherdToolsBalance,
  shepherdToolsBuildUnsigned,
  shepherdToolsPushTx,
  shepherdToolsSeedToWif,
  shepherdToolsWifToKP,
  shepherdElectrumListunspent,
  shepherdCliPromise,
  shepherdElectrumSplitUtxoPromise,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import { isKomodoCoin } from '../../../util/coinHelper';
import devlog from '../../../util/devlog';

class ToolsSplitUTXO extends React.Component {
  constructor() {
    super();
    this.state = {
      utxoSplitLargestUtxo: null,
      utxoSplitAddress: null,
      utxoSplitWif: null,
      utxoSplitSeed: '',
      utxoSplitCoin: '',
      utxoSplitList: null,
      utxoSplitPairsCount: 1,
      utxoSplitPairs: '10,0.002',
      utxoSplitRawtx: null,
      utxoSplitPushResult: null,
      utxoSplitShowUtxoList: false,
      splitUtxoApproximateVal: null,
    };
    this.updateInput = this.updateInput.bind(this);
    this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
    this.getUtxoSplit = this.getUtxoSplit.bind(this);
    this.splitUtxo = this.splitUtxo.bind(this);
    this.toggleSplitUtxoList = this.toggleSplitUtxoList.bind(this);
    this.splitUtxoApproximate = this.splitUtxoApproximate.bind(this);
  }

  toggleSplitUtxoList() {
    this.setState({
      utxoSplitShowUtxoList: !this.state.utxoSplitShowUtxoList,
    });
  }

  splitUtxoApproximate() {
    let largestUTXO = { amount: 0 };

    for (let i = 0; i < this.state.utxoSplitList.length; i++) {
      if (Number(this.state.utxoSplitList[i].amount) > Number(largestUTXO.amount)) {
        largestUTXO = JSON.parse(JSON.stringify(this.state.utxoSplitList[i]));
      }
    }

    devlog(`largest utxo ${largestUTXO.amount}`);
    devlog(`largest utxo ${largestUTXO.amount}`);

    const utxoSize = largestUTXO.amount;
    const targetSizes = this.state.utxoSplitPairs.split(',');
    const wif = this.state.utxoSplitWif;
    const address = this.state.utxoSplitAddress;
    const pairsCount = this.state.utxoSplitPairsCount;
    let totalOutSize = 0;
    let _targets = [];

    devlog(`total utxos ${pairsCount * targetSizes.length}`);
    devlog(`total pairs ${pairsCount}`);
    devlog(`utxo size ${utxoSize}`);
    devlog(`utxo sizes`);
    devlog(targetSizes);

    for (let i = 0; i < pairsCount; i++) {
      for (let j = 0; j < targetSizes.length; j++) {
        devlog(`vout ${_targets.length} ${targetSizes[j]}`);
        _targets.push(Number(targetSizes[j]) * 100000000);
        totalOutSize += Number(targetSizes[j]);
      }
    }

    devlog(`total out size ${totalOutSize}`);
    devlog(`largest utxo size ${largestUTXO.amount}`);
    devlog(`change ${Number(largestUTXO.amount - totalOutSize) - 0.0001 + (largestUTXO.interest ? largestUTXO.interest : 0)}`);

    this.setState({
      splitUtxoApproximateVal: largestUTXO.amount - totalOutSize > 0 ? totalOutSize : 'no op, output is bigger than utxo size!',
    });
  }

  splitUtxo() {
    let largestUTXO = { amount: 0 };

    for (let i = 0; i < this.state.utxoSplitList.length; i++) {
      if (Number(this.state.utxoSplitList[i].amount) > Number(largestUTXO.amount)) {
        largestUTXO = JSON.parse(JSON.stringify(this.state.utxoSplitList[i]));
      }
    }

    devlog(`largest utxo ${largestUTXO.amount}`);
    devlog(`largest utxo ${largestUTXO.amount}`);

    const utxoSize = largestUTXO.amount;
    const targetSizes = this.state.utxoSplitPairs.split(',');
    const wif = this.state.utxoSplitWif;
    const address = this.state.utxoSplitAddress;
    const pairsCount = this.state.utxoSplitPairsCount;
    let totalOutSize = 0;
    let _targets = [];

    devlog(`total utxos ${pairsCount * targetSizes.length}`);
    devlog(`total pairs ${pairsCount}`);
    devlog(`utxo size ${utxoSize}`);
    devlog(`utxo sizes`);
    devlog(targetSizes);

    for (let i = 0; i < pairsCount; i++) {
      for (let j = 0; j < targetSizes.length; j++) {
        devlog(`vout ${_targets.length} ${targetSizes[j]}`);
        _targets.push(parseInt(Number(targetSizes[j]) * 100000000));
        totalOutSize += Number(targetSizes[j]);
      }
    }

    devlog(`total out size ${totalOutSize}`);
    devlog(`largest utxo size ${largestUTXO.amount}`);
    devlog(`change ${Number(largestUTXO.amount - totalOutSize) - 0.0001 + (largestUTXO.interest ? largestUTXO.interest : 0)}`);

    const payload = {
      wif,
      network: 'komodo',
      targets: _targets,
      utxo: [largestUTXO],
      changeAddress: address,
      outputAddress: address,
      change: Math.floor(Number(largestUTXO.amount - totalOutSize) * 100000000 - 10000 + ((largestUTXO.interest ? largestUTXO.interest : 0) * 100000000)), // 10k sat fee
    };

    devlog(payload);
    devlog(largestUTXO);

    shepherdElectrumSplitUtxoPromise(payload)
    .then((res) => {
      devlog(res);

      if (res.msg === 'success') {
        const _coin = this.state.utxoSplitCoin.split('|');

        shepherdCliPromise(
          null,
          _coin[0],
          'sendrawtransaction',
          [res.result]
        )
        .then((res) => {
          devlog(res);

          if (!res.error) {
            this.setState({
              utxoSplitPushResult: res.result,
            });
            Store.dispatch(
              triggerToaster(
                'Split success',
                'UTXO',
                'success'
              )
            );
          } else {
            Store.dispatch(
              triggerToaster(
                res.result,
                'Split UTXO error',
                'error'
              )
            );
          }
        });
      } else {
        Store.dispatch(
          triggerToaster(
            res.result,
            'Split UTXO error',
            'error'
          )
        );
      }
    });
  }

  getUtxoSplit() {
    const _coin = this.state.utxoSplitCoin.split('|');

    shepherdToolsSeedToWif(
      this.state.utxoSplitSeed,
      'KMD',
      true
    )
    .then((seed2kpRes) => {
      if (seed2kpRes.msg === 'success') {
        shepherdCliPromise(null, _coin[0], 'listunspent')
        .then((res) => {
          // devlog(res);

          if (!res.error) {
            const _utxoList = res.result;
            let largestUTXO = 0;

            if (_utxoList &&
                _utxoList.length) {
              let _mineUtxo = [];

              for (let i = 0; i < _utxoList.length; i++) {
                if (_utxoList[i].spendable &&
                    seed2kpRes.result.keys.pub === _utxoList[i].address) {
                  _mineUtxo.push(_utxoList[i]);
                }
              }

              for (let i = 0; i < _mineUtxo.length; i++) {
                if (Number(_mineUtxo[i].amount) > Number(largestUTXO)) {
                  largestUTXO = _mineUtxo[i].amount;
                }
              }

              this.setState({
                utxoSplitList: _mineUtxo,
                utxoSplitLargestUtxo: largestUTXO,
                utxoSplitAddress: seed2kpRes.result.keys.pub,
                utxoSplitWif: seed2kpRes.result.keys.priv,
              });
            } else {
              Store.dispatch(
                triggerToaster(
                  res.result,
                  'Split UTXO error',
                  'error'
                )
              );
            }
          } else {
            Store.dispatch(
              triggerToaster(
                res.result,
                'Get UTXO error',
                'error'
              )
            );
          }
        });
      } else {
        Store.dispatch(
          triggerToaster(
            seed2kpRes.result,
            'Seed to wif error',
            'error'
          )
        );
      }
    });
  }

  renderCoinOption(option) {
    return (
      <div>
        <img
          src={ `assets/images/cryptologo/${option.icon.toLowerCase()}.png` }
          alt={ option.label }
          width="30px"
          height="30px" />
        <span className="margin-left-10">{ option.label }</span>
      </div>
    );
  }

  updateSelectedCoin(e, propName) {
    if (e &&
        e.value &&
        e.value.indexOf('|')) {
      this.setState({
        [propName]: e.value,
      });
    }
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  openExplorerWindow(txid, coin) {
    const url = `http://${coin}.explorer.supernet.org/tx/${txid}`;
    const remote = window.require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;

    const externalWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      title: `${translate('INDEX.LOADING')}...`,
      icon: remote.getCurrentWindow().iguanaIcon,
      webPreferences: {
        nodeIntegration: false,
      },
    });

    externalWindow.loadURL(url);
    externalWindow.webContents.on('did-finish-load', () => {
      setTimeout(() => {
        externalWindow.show();
      }, 40);
    });
  }

  renderUTXOSplitMergeResponse(type) {
    const _utxos = type === 'merge' ? this.state.utxoMergeList : this.state.utxoSplitList;
    let _items = [];

    if (_utxos &&
        _utxos.length) {
      for (let i = 0; i < _utxos.length; i++) {
        _items.push(
          <tr key={ `tools-utxos-${i}` }>
            <td>{ _utxos[i].amount }</td>
            <td>{ _utxos[i].address }</td>
            <td>{ _utxos[i].confirmations }</td>
            <td>{ _utxos[i].vout }</td>
            <td>{ _utxos[i].txid }</td>
          </tr>
        );
      }
    }

    return (
      <table className="table table-hover dataTable table-striped">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Address</th>
            <th>Confirmations</th>
            <th>Vout</th>
            <th>TxID</th>
          </tr>
        </thead>
        <tbody>
        { _items }
        </tbody>
        <tfoot>
          <tr>
            <th>Amount</th>
            <th>Address</th>
            <th>Confirmations</th>
            <th>Vout</th>
            <th>TxID</th>
          </tr>
        </tfoot>
      </table>
    );
  }

  render() {
    return (
      <div className="row margin-left-10">
        <div className="col-xlg-12 form-group form-material no-padding-left padding-bottom-10">
          <h4>Split UTXO</h4>
        </div>
        <div className="col-xlg-12 form-group form-material no-padding-left padding-top-20 padding-bottom-50">
          <label
            className="control-label col-sm-1 no-padding-left"
            htmlFor="kmdWalletSendTo">Coin</label>
          <Select
            name="utxoSplitCoin"
            className="col-sm-3"
            value={ this.state.utxoSplitCoin }
            onChange={ (event) => this.updateSelectedCoin(event, 'utxoSplitCoin') }
            optionRenderer={ this.renderCoinOption }
            valueRenderer={ this.renderCoinOption }
            options={ [{
              label: 'Komodo (KMD)',
              icon: 'KMD',
              value: `KMD|native`,
            }].concat(addCoinOptionsAC()) } />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left">
          <label
            className="control-label col-sm-1 no-padding-left"
            htmlFor="kmdWalletSendTo">Seed</label>
          <input
            type="text"
            className="form-control col-sm-3"
            name="utxoSplitSeed"
            onChange={ this.updateInput }
            value={ this.state.utxoSplitSeed }
            placeholder="Enter a seed"
            autoComplete="off"
            required />
        </div>
        { this.state.utxoSplitAddress &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            Pub: { this.state.utxoSplitAddress }
          </div>
        }
        { this.state.utxoSplitAddress &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            WIF: { this.state.utxoSplitWif }
          </div>
        }
        <div className="col-sm-12 form-group no-padding-left margin-top-20 padding-bottom-10">
          <button
            type="button"
            className="btn btn-info col-sm-2"
            onClick={ this.getUtxoSplit }>
              Get UTXO(s)
          </button>
        </div>
        { this.state.utxoSplitList &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            { /*this.renderUTXOSplitResponse()*/ }
            <div>Total UTXO: { this.state.utxoSplitList.length }</div>
            <div>Largest UTXO: { this.state.utxoSplitLargestUtxo }</div>
          </div>
        }
        <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
          <label className="switch">
            <input
              type="checkbox"
              checked={ this.state.utxoSplitShowUtxoList } />
            <div
              className="slider"
              onClick={ this.toggleSplitUtxoList }></div>
          </label>
          <div
            className="toggle-label margin-right-15 pointer iguana-core-toggle"
            onClick={ this.toggleSplitUtxoList }>
            Show UTXO list
          </div>
        </div>
        { this.state.utxoSplitShowUtxoList &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            { this.renderUTXOSplitMergeResponse('split') }
          </div>
        }
        <div className="col-sm-12 form-group form-material no-padding-left margin-top-20 padding-bottom-20">
          <label
            className="control-label col-sm-2 no-padding-left"
            htmlFor="kmdWalletSendTo">UTXO sizes</label>
          <input
            type="text"
            className="form-control col-sm-3"
            name="utxoSplitPairs"
            onChange={ this.updateInput }
            value={ this.state.utxoSplitPairs }
            placeholder="UTXO sized"
            autoComplete="off"
            required />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left padding-top-20 padding-bottom-20">
          <label
            className="control-label col-sm-2 no-padding-left"
            htmlFor="kmdWalletSendTo">Number of pairs</label>
          <input
            type="text"
            className="form-control col-sm-3"
            name="utxoSplitPairsCount"
            onChange={ this.updateInput }
            value={ this.state.utxoSplitPairsCount }
            placeholder="Pairs"
            autoComplete="off"
            required />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left margin-top-10 padding-bottom-10">
          <button
            type="button"
            className="btn btn-info col-sm-2"
            onClick={ this.splitUtxoApproximate }>
              Calc total output size
          </button>
          <button
            type="button"
            className="btn btn-info col-sm-2 margin-left-40"
            onClick={ this.splitUtxo }>
              Split UTXO(s)
          </button>
        </div>
        { this.state.splitUtxoApproximateVal &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            Total out size: { this.state.splitUtxoApproximateVal }
          </div>
        }
        {
          /*this.state.utxoSplitRawtx &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            Rawtx: <div style={{ wordBreak: 'break-all' }}>{ this.state.utxoSplitRawtx }</div>
          </div>*/
        }
        { this.state.utxoSplitPushResult &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
            TXID: <div style={{ wordBreak: 'break-all' }}>{ this.state.utxoSplitPushResult }</div>
            { isKomodoCoin(this.state.utxoSplitCoin.split('|')[0]) &&
              <div className="margin-top-10">
                <button
                  type="button"
                  className="btn btn-sm white btn-dark waves-effect waves-light pull-left"
                  onClick={ () => this.openExplorerWindow(this.state.utxoSplitPushResult, this.state.utxoSplitCoin.split('|')[0]) }>
                  <i className="icon fa-external-link"></i> { translate('INDEX.OPEN_TRANSACTION_IN_EPLORER', this.state.utxoSplitCoin.split('|')[0]) }
                </button>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default ToolsSplitUTXO;