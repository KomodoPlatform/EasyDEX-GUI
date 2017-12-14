import React from 'react';
import { connect } from 'react-redux';
import { translate } from '../../translate/translate';
import Config from '../../config';
import {
  addCoin,
  toggleAddcoinModal,
  triggerToaster,
  shepherdGetCoinList,
  shepherdPostCoinList,
  toggleZcparamsFetchModal,
} from '../../actions/actionCreators';
import Store from '../../store';
import { zcashParamsCheckErrors } from '../../util/zcashParams';
import mainWindow from '../../util/mainWindow';

import CoinSelectorsRender from './coin-selectors.render';
import AddCoinRender from './addcoin.render';

class AddCoin extends React.Component {
  constructor() {
    super();
    this.state = {
      nativeOnly: Config.iguanaLessMode,
      coins: [],
      defaultCoinState: {
        selectedCoin: null,
        spvMode: {
          disabled: true,
          checked: false,
        },
        nativeMode: {
          disabled: true,
          checked: false,
        },
        mode: -2,
        daemonParam: null,
      },
      display: false,
      actionsMenu: false,
      modalClassName: 'hide',
      isExperimentalOn: false,
    };
    this.existingCoins = null;
    this.activateCoin = this.activateCoin.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.activateAllCoins = this.activateAllCoins.bind(this);
    this.toggleActionsMenu = this.toggleActionsMenu.bind(this);
    this.saveCoinSelection = this.saveCoinSelection.bind(this);
    this.loadCoinSelection = this.loadCoinSelection.bind(this);
    this.verifyZcashParamsExist = this.verifyZcashParamsExist.bind(this);
  }

  verifyZcashParamsExist(mode) {
    return new Promise((resolve, reject) => {
      if (Number(mode) === -1) {
        const _res = mainWindow.zcashParamsExist;
        const __errors = zcashParamsCheckErrors(_res);

        if (__errors) {
          mainWindow.zcashParamsExistPromise()
          .then((res) => {
            const _errors = zcashParamsCheckErrors(res);
            mainWindow.zcashParamsExist = res;

            if (_errors) {
              Store.dispatch(
                triggerToaster(
                  _errors,
                  'Komodod',
                  'error',
                  false
                )
              );
              Store.dispatch(toggleZcparamsFetchModal(true));
              resolve(false);
            } else {
              resolve(true);
            }
          });
        } else {
          resolve(true);
        }
      } else {
        resolve(true);
      }
    });
  }

  saveCoinSelection() {
    shepherdPostCoinList(this.state.coins)
    .then((json) => {
      this.toggleActionsMenu();
    });
  }

  loadCoinSelection() {
    shepherdGetCoinList()
    .then((json) => {
      if (json.msg !== 'error') {
        this.setState(Object.assign({}, this.state, {
          coins: json.result,
          actionsMenu: false,
        }));
      } else {
        Store.dispatch(
          triggerToaster(
            translate('TOASTR.SELECTION_NOT_FOUND'),
            translate('TOASTR.COIN_SELECTION'),
            'info'
          )
        );
      }
    });
  }

  toggleSyncOnlyMode(index) {
    let _coins = this.state.coins;

    _coins[index] = Object.assign({}, _coins[index], {
      syncOnly: !this.state.coins[index].syncOnly,
    });

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  updateDaemonParam(e, index) {
    let _coins = this.state.coins;

    _coins[index] = Object.assign({}, _coins[index], {
      [e.target.name]: e.target.value,
    });

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  toggleActionsMenu() {
    this.setState(Object.assign({}, this.state, {
      actionsMenu: !this.state.actionsMenu,
    }));
  }

  componentWillMount() {
    this.addNewItem();

    this.setState({
      isExperimentalOn: mainWindow.appConfig.experimentalFeatures,
    });
  }

  componentWillReceiveProps(props) {
    const addCoinProps = props ? props.AddCoin : null;

    this.existingCoins = props && props.Main ? props.Main.coins : null;

    if (addCoinProps &&
        addCoinProps.display !== this.state.display) {
      this.setState(Object.assign({}, this.state, {
        display: addCoinProps.display,
        modalClassName: 'show fade',
      }));

      setTimeout(() => {
        this.setState(Object.assign({}, this.state, {
          display: addCoinProps.display,
          modalClassName: addCoinProps.display ? 'show in' : 'hide',
        }));
      }, 100);
    }
  }

  renderCoinOption(option) {
    return (
      <div>
        <img
          src={ `/assets/images/cryptologo/${option.icon.toLowerCase()}.png` }
          alt={ option.label }
          width="30px"
          height="30px"/>
          <span className="margin-left-10">{ option.label }</span>
      </div>
    );
  }

  updateSelectedCoin(e, index) {
    if (e.value &&
        e.value.indexOf('|')) {
      const coin = e.value.split('|');
      const defaultMode = coin[1];
      const modeToValue = { // TODO: move to utils
        'spv': 0,
        'native': -1,
      };
      const _value = e.value;
      let _coins = this.state.coins;

      _coins[index] = {
        selectedCoin: _value,
        spvMode: {
          disabled: _value.indexOf('spv') > -1 ? false : true,
          checked: defaultMode === 'spv' ? true : false,
        },
        nativeMode: {
          disabled: _value.indexOf('native') > -1 ? false : true,
          checked: defaultMode === 'native' ? true : false,
        },
        mode: modeToValue[defaultMode] !== undefined ? modeToValue[defaultMode] : -2,
      }

      this.setState(Object.assign({}, this.state, {
        coins: _coins,
      }));
    }
  }

  updateSelectedMode(_value, index) {
    let _coins = this.state.coins;
    const _selectedCoin = _coins[index].selectedCoin;

    _coins[index] = {
      selectedCoin: _selectedCoin,

      spvMode: {
        disabled: _selectedCoin.indexOf('spv') > -1 ? false : true,
        checked: _value === '0' ? true : false,
      },
      nativeMode: {
        disabled: _selectedCoin.indexOf('native') > -1 ? false : true,
        checked: _value === '-1' ? true : false,
      },
      mode: _value,
    };

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.dismiss();
    }
  }

  activateCoin() {
    const coin = this.state.coins[0].selectedCoin.split('|')[0];
    const _coin = this.state.coins[0];

    if (this.isCoinAlreadyAdded(coin)) {
      this.dismiss();
      return;
    }

    this.verifyZcashParamsExist(_coin.mode)
    .then((res) => {
      if (res) {
        if (!_coin.daemonParam) {
          Store.dispatch(addCoin(
            coin,
            _coin.mode,
          ));
        } else {
          Store.dispatch(addCoin(
            coin,
            _coin.mode,
            { type: _coin.daemonParam }
          ));
        }

        this.removeCoin();
        this.addNewItem();

        Store.dispatch(toggleAddcoinModal(false, false));
      }
    });
  }

  dismiss() {
    Store.dispatch(toggleAddcoinModal(false, false));
  }

  addNewItem() {
    let _coins = this.state.coins;
    _coins.push(this.state.defaultCoinState);

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  removeCoin(index) {
    let _coins = this.state.coins;
    _coins.splice(index, 1);

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  hasMoreThanOneCoin() {
    return this.state.coins.length > 1;
  }

  activateAllCoins() {
    const coin = this.state.coins[0].selectedCoin.split('|')[0];

    if (!this.isCoinAlreadyAdded(coin)) {
      Store.dispatch(
        addCoin(
          coin,
          this.state.coins[0].mode,
        )
      );
    }

    for (let i = 1; i < this.state.coins.length; i++) {
      const _item = this.state.coins[i];
      const itemCoin = _item.selectedCoin.split('|')[0];

      setTimeout(() => {
        if (!this.isCoinAlreadyAdded(itemCoin)) {
          Store.dispatch(
            addCoin(
              itemCoin,
              _item.mode,
            )
          );
        }

        if (i === this.state.coins.length - 1) {
          let _coins = [];
          _coins.push(this.state.defaultCoinState);

          this.setState(Object.assign({}, this.state, {
            coins: _coins,
          }));

          Store.dispatch(toggleAddcoinModal(false, false));
        }
      }, 2000 * i);
    }
  }

  renderCoinSelectors() {
    const _coins = this.state.coins;
    let items = [];

    for (let i = 0; i < _coins.length; i++) {
      const _item = _coins[i];
      const _coin = _item.selectedCoin || '';

      items.push(
        CoinSelectorsRender.call(
          this,
          _item,
          _coin,
          i
        )
      );
    }

    return items;
  }

  render() {
    return (
      AddCoinRender.call(this)
    );
  }

  isCoinAlreadyAdded(coin) {
    const modes = [
      'spv',
      'native'
    ];

    for (let mode of modes) {
      if (this.existingCoins[mode].indexOf(coin) !== -1) {
        const message = `${coin} ${translate('ADD_COIN.ALREADY_ADDED')} ${translate('ADD_COIN.IN')} ${mode} ${translate('ADD_COIN.MODE')}`;

        Store.dispatch(
          triggerToaster(
            message,
            translate('ADD_COIN.COIN_ALREADY_ADDED'),
            'error'
          )
        );

        return true;
      }
    }

    return false;
  }
}


const mapStateToProps = (state) => {
  return {
    Main: state.Main,
    ActiveCoin: {
      coin: state.ActiveCoin.coin,
    },
    AddCoin: state.AddCoin,
  };
};

export default connect(mapStateToProps)(AddCoin);