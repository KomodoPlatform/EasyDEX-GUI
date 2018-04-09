import React from 'react';
import { connect } from 'react-redux';
import {
  toggleAddcoinModal,
  shepherdElectrumAuth,
  shepherdElectrumCoins,
  startInterval,
  getDexCoins,
  triggerToaster,
  toggleLoginSettingsModal,
  stopInterval,
  dashboardChangeActiveCoin,
  toggleZcparamsFetchModal,
  toggleNotaryElectionsModal,
  activeHandle,
} from '../../actions/actionCreators';
import Config from '../../config';
import Store from '../../store';
import PassPhraseGenerator from '../../util/crypto/passphrasegenerator';
import zcashParamsCheckErrors from '../../util/zcashParams';
import SwallModalRender from './swall-modal.render';
import LoginRender from './login.render';
import translate from '../../translate/translate';
import {
  encryptPassphrase,
  loadPinList,
  loginWithPin,
} from '../../actions/actions/pin';
import mainWindow from '../../util/mainWindow';
import md5 from '../../util/crypto/md5';

const IGUNA_ACTIVE_HANDLE_TIMEOUT = 3000;
const IGUNA_ACTIVE_COINS_TIMEOUT = 10000;
const SEED_TRIM_TIMEOUT = 5000;

// TODO: remove duplicate activehandle and activecoins calls

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
      activeLoginSection: 'activateCoin',
      loginPassphrase: '',
      seedInputVisibility: false,
      loginPassPhraseSeedType: null,
      bitsOption: 256,
      randomSeed: PassPhraseGenerator.generatePassPhrase(256),
      randomSeedConfirm: '',
      isSeedConfirmError: false,
      isSeedBlank: false,
      displaySeedBackupModal: false,
      customWalletSeed: false,
      isCustomSeedWeak: false,
      nativeOnly: Config.iguanaLessMode,
      trimPassphraseTimer: null,
      displayLoginSettingsDropdown: false,
      displayLoginSettingsDropdownSection: null,
      shouldEncryptSeed: false,
      encryptKey: '',
      pubKey: '',
      decryptKey: '',
      selectedPin: '',
      isExperimentalOn: false,
      enableEncryptSeed: false,
      selectedShortcutNative: '',
      selectedShortcutSPV: '',
      seedExtraSpaces: false,
    };
    this.defaultState = JSON.parse(JSON.stringify(this.state));
    this.toggleActivateCoinForm = this.toggleActivateCoinForm.bind(this);
    this.updateRegisterConfirmPassPhraseInput = this.updateRegisterConfirmPassPhraseInput.bind(this);
    this.updateLoginPassPhraseInput = this.updateLoginPassPhraseInput.bind(this);
    this.loginSeed = this.loginSeed.bind(this);
    this.toggleSeedInputVisibility = this.toggleSeedInputVisibility.bind(this);
    this.handleRegisterWallet = this.handleRegisterWallet.bind(this);
    this.toggleSeedBackupModal = this.toggleSeedBackupModal.bind(this);
    this.copyPassPhraseToClipboard = this.copyPassPhraseToClipboard.bind(this);
    this.execWalletCreate = this.execWalletCreate.bind(this);
    this.resizeLoginTextarea = this.resizeLoginTextarea.bind(this);
    this.toggleLoginSettingsDropdown = this.toggleLoginSettingsDropdown.bind(this);
    this.updateEncryptKey = this.updateEncryptKey.bind(this);
    this.updatePubKey = this.updatePubKey.bind(this);
    this.updateDecryptKey = this.updateDecryptKey.bind(this);
    this.loadPinList = this.loadPinList.bind(this);
    this.updateSelectedShortcut = this.updateSelectedShortcut.bind(this);
    this.setRecieverFromScan = this.setRecieverFromScan.bind(this);
  }

  _toggleNotaryElectionsModal() {
    this.setState({
      displayLoginSettingsDropdown: false,
    });
    Store.dispatch(toggleNotaryElectionsModal(true));
  }

  // the setInterval handler for 'activeCoins'
  _iguanaActiveCoins = null;

  toggleLoginSettingsDropdownSection(sectionName) {
    Store.dispatch(toggleLoginSettingsModal(true));

    this.setState({
      displayLoginSettingsDropdown: false,
      displayLoginSettingsDropdownSection: sectionName,
    });
  }

  setRecieverFromScan(receiver) {
    if (receiver) {
      this.setState({
        loginPassphrase: receiver,
      });
    } else {
      Store.dispatch(
        triggerToaster(
          'Unable to recognize QR code',
          'QR scan Error',
          'error'
        )
      );
    }
  }

  isCustomWalletSeed() {
    return this.state.customWalletSeed;
  }

  toggleCustomWalletSeed() {
    this.setState({
      customWalletSeed: !this.state.customWalletSeed,
    }, () => {
      // if customWalletSeed is set to false, regenerate the seed
      if (!this.state.customWalletSeed) {
        this.setState({
          randomSeed: PassPhraseGenerator.generatePassPhrase(this.state.bitsOption),
          isSeedConfirmError: false,
          isSeedBlank: false,
          isCustomSeedWeak: false,
        });
      } else {
        // if customWalletSeed is set to true, reset to seed to an empty string
        this.setState({
          randomSeed: '',
          randomSeedConfirm: '',
        });
      }
    });
  }

  shouldEncryptSeed() {
    return this.state.shouldEncryptSeed;
  }

  toggleShouldEncryptSeed() {
    this.setState({
      shouldEncryptSeed: !this.state.shouldEncryptSeed,
    });
  }

  updateEncryptKey(e) {
    this.setState({
      encryptKey: e.target.value,
    });
  }

  updatePubKey(e) {
    this.setState({
      pubKey: e.target.value,
    });
  }

  updateDecryptKey(e) {
    this.setState({
      decryptKey: e.target.value,
    });
  }

  componentDidMount() {
    this.setState({
      isExperimentalOn: mainWindow.experimentalFeatures,
    });
  }

  toggleSeedInputVisibility() {
    this.setState({
      seedInputVisibility: !this.state.seedInputVisibility,
    });

    this.resizeLoginTextarea();
  }

  generateNewSeed(bits) {
    this.setState(Object.assign({}, this.state, {
      randomSeed: PassPhraseGenerator.generatePassPhrase(bits),
      bitsOption: bits,
      isSeedBlank: false,
    }));
  }

  toggleLoginSettingsDropdown() {
    this.setState(Object.assign({}, this.state, {
      displayLoginSettingsDropdown: !this.state.displayLoginSettingsDropdown,
    }));
  }

  componentWillReceiveProps(props) {
    if (props.Login.pinList === 'no pins') {
      props.Login.pinList = [];
    }

    if (props &&
        props.Main &&
        props.Main.isLoggedIn) {
      if (props.Main.total === 0) {
        this.setState({
          activeLoginSection: 'activateCoin',
          loginPassphrase: '',
          display: true,
        });
      } else {
        this.setState({
          loginPassphrase: '',
          display: false,
        });
      }
    }

    if (props &&
        props.Main &&
        !props.Main.isLoggedIn) {
      document.body.className = 'page-login layout-full page-dark';

      if (props.Interval &&
          props.Interval.interval &&
          props.Interval.interval.sync) {
        Store.dispatch(dashboardChangeActiveCoin());
        Store.dispatch(
          stopInterval(
            'sync',
            props.Interval.interval
          )
        );
      }

      this.setState({
        display: true,
        activeLoginSection: this.state.activeLoginSection !== 'signup' ? 'login' : 'signup',
      });
    }

    if (props.Main &&
        props.Main.total === 0) {
      document.body.className = 'page-login layout-full page-dark';

      if (props.Interval &&
          props.Interval.interval &&
          props.Interval.interval.sync) {
        Store.dispatch(dashboardChangeActiveCoin());
        Store.dispatch(
          stopInterval(
            'sync',
            props.Interval.interval
          )
        );
      }
    }

    if (this.state.activeLoginSection !== 'signup' &&
        props &&
        props.Main &&
        props.Main.isLoggedIn) {
      this.setState({
        loginPassphrase: '',
        activeLoginSection: 'activateCoin',
      });
    }
  }

  toggleActivateCoinForm() {
    Store.dispatch(toggleAddcoinModal(true, false));
  }

  resizeLoginTextarea() {
    // auto-size textarea
    setTimeout(() => {
      if (this.state.seedInputVisibility) {
        document.querySelector('#loginPassphrase').style.height = '1px';
        document.querySelector('#loginPassphrase').style.height = `${(15 + document.querySelector('#loginPassphrase').scrollHeight)}px`;
      }
    }, 100);
  }

  updateLoginPassPhraseInput(e) {
    const newValue = e.target.value;

    clearTimeout(this.state.trimPassphraseTimer);

    const _trimPassphraseTimer = setTimeout(() => {
      if (newValue[0] === ' ' ||
          newValue[newValue.length - 1] === ' ') {
        this.setState({
          seedExtraSpaces: true,
        });
      } else {
        this.setState({
          seedExtraSpaces: false,
        });
      }
    }, SEED_TRIM_TIMEOUT);

    this.resizeLoginTextarea();

    this.setState({
      trimPassphraseTimer: _trimPassphraseTimer,
      [e.target.name === 'loginPassphraseTextarea' ? 'loginPassphrase' : e.target.name]: newValue,
      loginPassPhraseSeedType: this.getLoginPassPhraseSeedType(newValue),
    });
  }

  updateRegisterConfirmPassPhraseInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
      isSeedConfirmError: false,
      isSeedBlank: this.isBlank(e.target.value),
    });
  }

  updateWalletSeed(e) {
    this.setState({
      randomSeed: e.target.value,
      isSeedConfirmError: false,
      isSeedBlank: this.isBlank(e.target.value),
    });
  }

  loginSeed() {
    const stringEntropy = mainWindow.checkStringEntropy(this.state.loginPassphrase);

    if (!stringEntropy) {
      Store.dispatch(
        triggerToaster(
          ['Your seed is weak, it means that someone can steal your funds by guessing/bruteforcing the seed.',
            '',
            'Consider creating a stronger seed and moving your funds to a new address.'],
          'Weak seed detected',
          'warning toastr-wide',
          false
        )
      );
    }

    mainWindow.createSeed.secondaryLoginPH = md5(this.state.loginPassphrase);
    // reset the login pass phrase values so that when the user logs out, the values are clear
    this.setState({
      loginPassphrase: '',
      loginPassPhraseSeedType: null,
    });

    // reset login input vals
    this.refs.loginPassphrase.value = '';
    this.refs.loginPassphraseTextarea.value = '';

    if (this.state.shouldEncryptSeed) {
      Store.dispatch(encryptPassphrase(this.state.loginPassphrase, this.state.encryptKey, this.state.pubKey));
    }

    if (this.state.selectedPin) {
      Store.dispatch(loginWithPin(this.state.decryptKey, this.state.selectedPin));
    } else {
      Store.dispatch(shepherdElectrumAuth(this.state.loginPassphrase));
      Store.dispatch(shepherdElectrumCoins());
    }

    this.setState(this.defaultState);
  }

  loadPinList() {
    Store.dispatch(loadPinList());
  }

  updateSelectedPin(e) {
    this.setState({
      selectedPin: e.target.value,
    });
  }

  getLoginPassPhraseSeedType(passPhrase) {
    if (!passPhrase) {
      return null;
    }

    const passPhraseWords = passPhrase.split(' ');

    if (!PassPhraseGenerator.arePassPhraseWordsValid(passPhraseWords)) {
      return null;
    }

    if (PassPhraseGenerator.isPassPhraseValid(passPhraseWords, 256)) {
      return translate('LOGIN.IGUANA_SEED');
    }

    if (PassPhraseGenerator.isPassPhraseValid(passPhraseWords, 160)) {
      return translate('LOGIN.WAVES_SEED');
    }

    if (PassPhraseGenerator.isPassPhraseValid(passPhraseWords, 128)) {
      return translate('LOGIN.NXT_SEED');
    }

    return null;
  }

  updateActiveLoginSection(name) {
    // reset login/create form
    this.setState({
      activeLoginSection: name,
      loginPassphrase: null,
      loginPassPhraseSeedType: null,
      seedInputVisibility: false,
      bitsOption: 256,
      randomSeed: PassPhraseGenerator.generatePassPhrase(256),
      randomSeedConfirm: '',
      isSeedConfirmError: false,
      isSeedBlank: false,
      displaySeedBackupModal: false,
      customWalletSeed: false,
      isCustomSeedWeak: false,
   });
  }

  execWalletCreate() {
    mainWindow.createSeed.triggered = true;
    mainWindow.createSeed.firstLoginPH = md5(this.state.randomSeed);

    Store.dispatch(
      shepherdElectrumAuth(this.state.randomSeedConfirm)
    );
    Store.dispatch(
      shepherdElectrumCoins()
    );

    this.setState({
      activeLoginSection: 'activateCoin',
      displaySeedBackupModal: false,
      isSeedConfirmError: false,
    });
  }

  // TODO: disable register btn if seed or seed conf is incorrect
  handleRegisterWallet() {
    const enteredSeedsMatch = this.state.randomSeed === this.state.randomSeedConfirm;
    const isSeedBlank = this.isBlank(this.state.randomSeed);

    const stringEntropy = mainWindow.checkStringEntropy(this.state.customWalletSeed);

    if (!stringEntropy &&
        this.state.customWalletSeed) {
      Store.dispatch(
        triggerToaster(
          ['Your seed is weak, it means that someone can steal your funds by guessing/bruteforcing the seed.',
            '',
            'Consider using a stronger seed that is not susceptible to such attacks.'],
          'Weak seed detected',
          'warning toastr-wide',
          false
        )
      );
    }

    const _customSeed = this.state.customWalletSeed;

    this.setState({
      isCustomSeedWeak: _customSeed === null ? true : false,
      isSeedConfirmError: !enteredSeedsMatch ? true : false,
      isSeedBlank: isSeedBlank ? true : false,
    });

    if (enteredSeedsMatch &&
        !isSeedBlank &&
        _customSeed !== null &&
        stringEntropy) {
      this.toggleSeedBackupModal();
    }
  }

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  handleKeydown(e) {
    this.updateLoginPassPhraseInput(e);

    if (e.key === 'Enter' &&
        this.state.loginPassphrase) {
      this.loginSeed();
    }
  }

  toggleSeedBackupModal() {
    this.setState(Object.assign({}, this.state, {
      displaySeedBackupModal: !this.state.displaySeedBackupModal,
    }));
  }

  copyPassPhraseToClipboard() {
    const passPhrase = this.state.randomSeed;
    const textField = document.createElement('textarea');

    textField.innerText = passPhrase;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();

    Store.dispatch(
      triggerToaster(
        translate('LOGIN.SEED_SUCCESSFULLY_COPIED'),
        translate('LOGIN.SEED_COPIED'),
        'success'
      )
    );
  }

  updateSelectedShortcut(e, type) {
    this.setState({
      [type === 'native' ? 'selectedShortcutNative' : 'selectedShortcutSPV'] : e.value,
    });

    if (type === 'native') {
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
          } else {
            mainWindow.startKMDNative(e.value.toUpperCase());
          }
        });
      } else {
        mainWindow.startKMDNative(e.value.toUpperCase());
      }
    } else {
      mainWindow.startSPV(e.value.toUpperCase());
    }

    setTimeout(() => {
      Store.dispatch(activeHandle());
      if (type === 'native') {
        Store.dispatch(shepherdElectrumCoins());
      }
      Store.dispatch(getDexCoins());
    }, 500);
    setTimeout(() => {
      Store.dispatch(activeHandle());
      if (type === 'native') {
        Store.dispatch(shepherdElectrumCoins());
      }
      Store.dispatch(getDexCoins());
    }, 1000);
    setTimeout(() => {
      Store.dispatch(activeHandle());
      if (type === 'native') {
        Store.dispatch(shepherdElectrumCoins());
      }
      Store.dispatch(getDexCoins());
    }, type === 'native' ? 5000 : 2000);
  }

  renderSwallModal() {
    if (this.state.displaySeedBackupModal) {
      return SwallModalRender.call(this);
    }

    return null;
  }

  renderShortcutOption(option) {
    if (option.value.indexOf('+') > -1) {
      const _comps = option.value.split('+');
      let _items = [];

      for (let i = 0; i < _comps.length; i++) {
        _items.push(
          <span key={ `addcoin-shortcut-icons-${i}` }>
            <img
              src={ `assets/images/cryptologo/${_comps[i].toLowerCase()}.png` }
              alt={ _comps[i].toUpperCase() }
              width="30px"
              height="30px" />
              { i !== _comps.length - 1 &&
                <span className="margin-left-10 margin-right-10">+</span>
              }
          </span>
        );
      }

      return _items;
    } else {
      return (
        <div>
          <img
            src={ `assets/images/cryptologo/${option.value.toLowerCase()}.png` }
            alt={ option.value.toUpperCase() }
            width="30px"
            height="30px" />
            <span className="margin-left-10">{ option.value.toUpperCase() }</span>
        </div>
      );
    }
  }

  render() {
    if ((this.state && this.state.display) ||
        !this.props.Main) {
      return LoginRender.call(this);
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    Main: state.Main,
    Dashboard: state.Dashboard,
    Interval: {
      interval: state.Interval.interval,
    },
    Login: state.Login,
  };
};

export default connect(mapStateToProps)(Login);