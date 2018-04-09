import React from 'react';
import translate from '../../translate/translate';
import LoginSettingsModal from '../dashboard/loginSettingsModal/loginSettingsModal';
import ZcparamsFetchModal from '../dashboard/zcparamsFetchModal/zcparamsFetchModal';
import QRModal from '../dashboard/qrModal/qrModal';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import mainWindow from '../../util/mainWindow';

const LoginRender = function() {
  return (
    <div>
      { this.props.Dashboard.displayZcparamsModal &&
        <ZcparamsFetchModal />
      }
      <LoginSettingsModal section={ this.state.displayLoginSettingsDropdownSection } />
      { this.renderSwallModal() }
      <div className="page animsition vertical-align text-center fade-in">
        <div className="page-content vertical-align-middle col-xs-12 col-sm-6 col-sm-offset-3">
          <div className="brand">
            <img
              className="brand-img"
              src="assets/images/agama-login-logo.svg"
              width="200"
              height="160"
              alt="SuperNET Agama" />
          </div>
          { /*mainWindow.nnVoteChain &&
            <a
              className="login-nn-elections"
              onClick={ () => this._toggleNotaryElectionsModal() }>
              <i className="icon fa-thumbs-up"></i> Notary Elections 2018
            </a>*/
          }
          <div className="login-settings-dropdown margin-bottom-30">
            <div>
              <span
                className="login-settings-dropdown-trigger"
                onClick={ this.toggleLoginSettingsDropdown }>
                <i className="icon fa-cogs"></i>&nbsp;
                <span className="login-settings-dropdown-label">{ translate('LOGIN.QUICK_ACCESS') }</span>
              </span>
            </div>
            <div>
              <ul className={ this.state.displayLoginSettingsDropdown ? 'dropdown-menu show' : 'hide' }>
                <li>
                  <a onClick={ () => this.toggleLoginSettingsDropdownSection('settings') }>
                    <i className="icon md-settings"></i> { translate('INDEX.SETTINGS') }
                  </a>
                </li>
                <li>
                  <a onClick={ () => this.toggleLoginSettingsDropdownSection('about') }>
                    <i className="icon fa-users"></i> { translate('ABOUT.ABOUT_AGAMA') }
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={ this.state.activeLoginSection === 'login' ? 'show' : 'hide' }>
            <h4 className="color-white">
              { translate('INDEX.WELCOME_LOGIN') }
            </h4>
            { this.props.Login.pinList.length > 0 &&
             <span>{ translate('LOGIN.PIN_LOGIN_INFO') }</span>
            }
            <div className="form-group form-material floating col-sm-12 horizontal-padding-0">
              <input
                type="password"
                name="loginPassphrase"
                ref="loginPassphrase"
                className={ !this.state.seedInputVisibility ? 'form-control' : 'hide' }
                onChange={ this.updateLoginPassPhraseInput }
                onKeyDown={ (event) => this.handleKeydown(event) }
                autoComplete="off"
                value={ this.state.loginPassphrase || '' } />
              <textarea
                className={ this.state.seedInputVisibility ? 'form-control' : 'hide' }
                id="loginPassphrase"
                ref="loginPassphraseTextarea"
                name="loginPassphraseTextarea"
                autoComplete="off"
                onChange={ this.updateLoginPassPhraseInput }
                onKeyDown={ (event) => this.handleKeydown(event) }
                value={ this.state.loginPassphrase || '' }></textarea>
              <i
                className={ 'seed-toggle fa fa-eye' +  (!this.state.seedInputVisibility ? '-slash' : '') }
                onClick={ this.toggleSeedInputVisibility }></i>
              <label
                className="floating-label"
                htmlFor="inputPassword">{ translate('INDEX.WALLET_SEED') }</label>
              <div className="qr-modal-login-block">
                <QRModal
                  mode="scan"
                  setRecieverFromScan={ this.setRecieverFromScan } />
              </div>
            </div>
            { this.state.loginPassPhraseSeedType &&
              <div
                className="form-group form-material floating horizontal-padding-0 margin-top-20 seed-type-block"
                style={{ width: `${this.state.loginPassPhraseSeedType.length * 8}px` }}>
                <div className="placeholder-label">{ this.state.loginPassPhraseSeedType }</div>
              </div>
            }
            { this.state.seedExtraSpaces &&
              <span>
                <i className="icon fa-warning seed-extra-spaces-warning"
                  data-tip="Your seed contains leading/trailing space characters"
                  data-html={ true }></i>
                <ReactTooltip
                  effect="solid"
                  className="text-left" />
              </span>
            }
            { this.state.loginPassphrase &&
              this.state.enableEncryptSeed &&
              <div className="row">
                <div className="toggle-box padding-top-30 col-sm-3">
                  <span className="pointer">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={ this.shouldEncryptSeed() } />
                      <div
                        className="slider"
                        onClick={ () => this.toggleShouldEncryptSeed() }></div>
                    </label>
                    <div
                      className="toggle-label white"
                      onClick={ () => this.toggleShouldEncryptSeed() }>
                        { translate('LOGIN.ENCRYPT_SEED') }
                    </div>
                  </span>
                </div>

                <div className="col-sm-9">
                  <div className="form-group form-material floating horizontal-padding-0 margin-5 margin-right-0">
                    <input
                      type="text"
                      className="form-control"
                      name="encryptKey"
                      placeholder={ translate('LOGIN.ENCRYPT_KEY') }
                      onChange={ this.updateEncryptKey }
                      value={ this.state.encryptKey }
                      disabled={ !this.shouldEncryptSeed() } />
                  </div>

                  <div className="form-group form-material floating horizontal-padding-0 margin-5 margin-right">
                    <input
                      type="text"
                      className="form-control"
                      name="pubKey"
                      placeholder={ translate('LOGIN.PUBKEY') }
                      onChange={ this.updatePubKey }
                      value={ this.state.pubKey }
                      disabled={ !this.shouldEncryptSeed() } />
                  </div>
                </div>
              </div>
            }

            { this.props.Login.pinList.length > 0 &&
              <div className="row margin-top-30">
                <div className="col-xs-12">
                  <div className="pin-block-one">
                    <hr/>
                  </div>
                  <div className="pin-block-two">
                    <span>{ translate('INDEX.OR') }</span>
                  </div>
                  <div className="pin-block-three">
                    <hr/>
                  </div>
                </div>
              </div>
            }
            { this.props.Login.pinList.length > 0 &&
              <div className="row">
                <div className="form-group form-material floating col-sm-8 padding-left-10 horizontal-padding-0">
                  <select
                    className="form-control form-material"
                    name="storedPins"
                    value={ this.state.selectedPin }
                    onChange={ (event) => this.updateSelectedPin(event) }
                    autoFocus>
                    <option
                      className="login-option"
                      value="">{ translate('INDEX.SELECT') }</option>
                    { this.props.Login.pinList.map((pin) => {
                      return <option
                              className="login-option"
                              value={pin}
                              key={pin}>{ pin }</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group form-material floating col-sm-4 padding-left-10 margin-top-20">
                  <input
                    type="text"
                    className="form-control"
                    name="decryptKey"
                    placeholder={ translate('LOGIN.DECRYPT_KEY') }
                    disabled={ false }
                    onChange={ this.updateDecryptKey }
                    value={ this.state.decryptKey } />
                </div>
              </div>
            }

            <button
              type="button"
              className="btn btn-primary btn-block margin-top-20"
              onClick={ this.loginSeed }
              disabled={ !this.state.loginPassphrase || !this.state.loginPassphrase.length }>
              { translate('INDEX.SIGN_IN') }
            </button>
            <div className="form-group form-material floating">
              <button
                className="btn btn-lg btn-flat btn-block waves-effect"
                id="register-btn"
                onClick={ () => this.updateActiveLoginSection('signup') }>
                { translate('INDEX.CREATE_WALLET') }
              </button>
              <button
                className="btn btn-lg btn-flat btn-block waves-effect hide"
                id="logint-another-wallet">
                { translate('INDEX.LOGIN_ANOTHER_WALLET') }
              </button>
              <button
                className="btn btn-lg btn-flat btn-block waves-effect margin-top-20"
                id="register-btn"
                onClick={ this.toggleActivateCoinForm }
                disabled={ !this.props.Main }>
                <span className="ladda-label">
                  { translate('ADD_COIN.ADD_ANOTHER_COIN') }
                </span>
              </button>
            </div>
          </div>

          <div className={ this.state.activeLoginSection === 'activateCoin' ? 'show' : 'hide' }>
            <h4 className="color-white">
              { translate('INDEX.WELCOME_PLEASE_ADD') }
            </h4>
            <div className="form-group form-material floating width-540 vertical-margin-30 auto-side-margin">
              <button
                className="btn btn-lg btn-primary btn-block ladda-button"
                onClick={ this.toggleActivateCoinForm }
                disabled={ !this.props.Main }>
                <span className="ladda-label">
                  { translate('INDEX.ACTIVATE_COIN') }
                </span>
              </button>
              <div className="line">{ translate('LOGIN.OR_USE_A_SHORTCUT') }</div>
              { mainWindow.arch === 'x64' &&
                <div className="addcoin-shortcut">
                  <div>
                    <i className="icon fa-cube margin-right-5"></i>
                    { translate('INDEX.NATIVE_MODE') }
                    <i
                      className="icon fa-question-circle login-help"
                      data-tip="<strong>Be aware:</strong> <u>Native mode</u> requires to download the whole blockchain data to a local disk before you can start using it.<br/>This may take from <strong>several hours to a day</strong> depending on your connection and hardware.<br/>Please <u>try to keep Agama running</u> until the whole process is finished."
                      data-html={ true }></i>
                    <ReactTooltip
                      effect="solid"
                      className="text-left" />
                  </div>
                  <Select
                    name="selectedShortcutNative"
                    value={ this.state.selectedShortcutNative }
                    onChange={ (event) => this.updateSelectedShortcut(event, 'native') }
                    optionRenderer={ this.renderShortcutOption }
                    valueRenderer={ this.renderShortcutOption }
                    options={[
                      { value: 'kmd', label: 'kmd' },
                      { value: 'mnz', label: 'mnz' },
                      { value: 'btch', label: 'btch' },
                      { value: 'revs', label: 'revs' },
                      { value: 'jumblr', label: 'jumblr' },
                      { value: 'kmd+revs+jumblr', label: 'kmd+revs+jumblr' },
                    ]} />
                </div>
              }
              <div className="addcoin-shortcut">
                <div>
                  <i className="icon fa-flash margin-right-5"></i>
                  { translate('INDEX.SPV_MODE') }
                  <i
                    className="icon fa-question-circle login-help"
                    data-tip="If you need a quick and easy access to your funds try <u>Lite (SPV) mode</u> which doesn't require any blockchain to be loaded locally.<br/>All data is requested on demand from Electrum servers."
                    data-html={ true }></i>
                  <ReactTooltip
                    effect="solid"
                    className="text-left" />
                </div>
                <Select
                  name="selectedShortcutSPV"
                  value={ this.state.selectedShortcutSPV }
                  onChange={ (event) => this.updateSelectedShortcut(event, 'spv') }
                  optionRenderer={ this.renderShortcutOption }
                  valueRenderer={ this.renderShortcutOption }
                  options={[
                    { value: 'kmd', label: 'kmd' },
                    { value: 'chips', label: 'chips' },
                    { value: 'btch', label: 'btch' },
                    { value: 'mnz', label: 'mnz' },
                    { value: 'revs', label: 'revs' },
                    { value: 'jumblr', label: 'jumblr' },
                    { value: 'kmd+revs+jumblr', label: 'kmd+revs+jumblr' },
                  ]} />
              </div>
            </div>
          </div>

          <div className={ this.state.activeLoginSection === 'signup' ? 'show' : 'hide' }>
            <div className="register-form">
              <h4 className="hint color-white">
                { translate('INDEX.SELECT_SEED_TYPE') }:
              </h4>
              <div className="row">
                <div className="col-sm-5 horizontal-padding-0">
                  <div className="toggle-box vertical-padding-20">
                    <span className="pointer">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={ this.isCustomWalletSeed() } />
                        <div
                          className="slider"
                          onClick={ () => this.toggleCustomWalletSeed() }></div>
                      </label>
                      <div
                        className="toggle-label white"
                        onClick={ () => this.toggleCustomWalletSeed() }>
                        { translate('LOGIN.CUSTOM_WALLET_SEED') }
                      </div>
                    </span>
                  </div>
                </div>
                <div className="col-sm-7 horizontal-padding-0">
                { !this.isCustomWalletSeed() &&
                  <div>
                    <div className="form-group form-material floating">
                      <div
                        className="radio-custom radio-default radio-inline"
                        onClick={ () => this.state.bitsOption !== 256 && this.generateNewSeed(256) }>
                        <input
                          type="radio"
                          name="PassPhraseOptions"
                          checked={ this.state.bitsOption === 256 }
                          readOnly />
                        <label htmlFor="PassPhraseOptionsIguana">
                          { translate('LOGIN.IGUANA_SEED') }
                        </label>
                      </div>
                      <div
                        className="radio-custom radio-default radio-inline"
                        onClick={ () => this.state.bitsOption !== 160 && this.generateNewSeed(160) }>
                        <input
                          type="radio"
                          name="PassPhraseOptions"
                          checked={ this.state.bitsOption === 160 }
                          readOnly />
                        <label htmlFor="PassPhraseOptionsWaves">
                          { translate('LOGIN.WAVES_SEED') }
                        </label>
                      </div>
                      <div
                        className="radio-custom radio-default radio-inline"
                        onClick={ () => this.state.bitsOption !== 128 && this.generateNewSeed(128) }>
                        <input
                          type="radio"
                          name="PassPhraseOptions"
                          checked={ this.state.bitsOption === 128 }
                          readOnly />
                        <label htmlFor="PassPhraseOptionsNXT">
                          { translate('LOGIN.NXT_SEED') }
                        </label>
                      </div>
                    </div>
                  </div>
                }
                </div>
              </div>

              <div className="form-group form-material floating seed-tooltip">
                <textarea
                  className="form-control placeholder-no-fix height-100"
                  type="text"
                  id="walletseed"
                  value={ this.state.randomSeed }
                  onChange={ (e) => this.updateWalletSeed(e) }
                  readOnly={ !this.isCustomWalletSeed() }></textarea>
                <button
                  className="copy-floating-label"
                  htmlFor="walletseed"
                  onClick={ () => this.copyPassPhraseToClipboard() }>
                  { translate('INDEX.COPY') }
                </button>
                {/*<span className={ this.state.isCustomSeedWeak ? 'tooltiptext' : 'hide' }>
                  <strong>{ translate('INDEX.WEAK_SEED') }</strong><br /><br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN1') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN2') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN3') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN4') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN5') }<br />
                </span>*/}
                <label
                  className="floating-label"
                  htmlFor="walletseed">{ translate('INDEX.WALLET_SEED') }</label>
              </div>
              <div className="form-group form-material floating">
                <textarea
                  className="form-control placeholder-no-fix height-100"
                  type="text"
                  name="randomSeedConfirm"
                  value={ this.state.randomSeedConfirm }
                  onChange={ this.updateRegisterConfirmPassPhraseInput }
                  id="rwalletseed"></textarea>
                <span className={ this.state.isSeedBlank ? 'help-block' : 'hide' }>
                  { translate('LOGIN.MUST_ENTER_SEED') }.
                </span>
                <span className={ this.state.isSeedConfirmError ? 'help-block' : 'hide' }>
                  { translate('LOGIN.ENTER_VALUE_AGAIN') }.
                </span>
                <label
                  className="floating-label"
                  htmlFor="rwalletseed">{ translate('INDEX.CONFIRM_SEED') }</label>
                <button
                  type="button"
                  className="btn btn-success btn-block margin-top-20 btn-generate-qr">
                  <QRModal
                    qrSize="256"
                    modalSize="md"
                    title="Seed QR recovery"
                    fileName="agama-seed"
                    content={ this.state.randomSeed } />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={ this.handleRegisterWallet }
                disabled={ !this.state.randomSeedConfirm || !this.state.randomSeed || !this.state.randomSeedConfirm.length || !this.state.randomSeed.length || this.state.randomSeedConfirm !== this.state.randomSeed }>
                { translate('INDEX.REGISTER') }
              </button>
              <div className="form-group form-material floating">
                <button
                  className="btn btn-lg btn-flat btn-block waves-effect"
                  id="register-back-btn"
                  onClick={ () => this.updateActiveLoginSection('login') }>
                  { translate('INDEX.BACK_TO_LOGIN') }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRender;