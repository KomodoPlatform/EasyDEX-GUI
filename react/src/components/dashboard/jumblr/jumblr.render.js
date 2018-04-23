import React from 'react';
import translate from '../../../translate/translate';

import WalletsHeader from '../walletsHeader/walletsHeader';
import SendCoin from '../sendCoin/sendCoin';
import ReceiveCoin from '../receiveCoin/receiveCoin';

export const JumblrRenderSecretAddressList = function(type) {
  const _jumblrAddressList = type === 'gen' ? this.state.jumblrSecretAddress : this.state.jumblrSecretAddressImport;
  let _items = [];

  if (_jumblrAddressList &&
      _jumblrAddressList.length) {
    for (let i = 0; i < _jumblrAddressList.length; i++) {
      _items.push(
        <tr key={ `jumblr-secret-address-${i}` }>
          <td>{ _jumblrAddressList[i].address }</td>
          <td>{ _jumblrAddressList[i].wif }</td>
        </tr>
      );
    }
    return _items;
  } else {
    return null;
  }
};

export const JumblrRender = function() {
  return (
    <div className="page margin-left-0 jumblr">
      <WalletsHeader activeSection="jumblr" />
      <div className="page-content margin-top-30">
        <div className="row">
          <div className="col-xs-12">
            <div className="alert alert-danger">
              <button
                type="button"
                className="close">
              </button>
              <span className="jumblr-header">
                <i className="icon fa-paw"></i> { translate('JUMBLR.NOTICE') }
              </span>
              <br />
              { translate('JUMBLR.DESCRIPTION') }
            </div>
          </div>

          <div className="col-xs-12">
            <div className="alert alert-info alert-dismissible">
              <button
                type="button"
                className="close">
                <span>×</span>
              </button>
              <span className="jumblr-header">
                <i className="icon fa-paw"></i> { translate('JUMBLR.ABOUT') }
              </span>
              <br />
              <p>{ translate('JUMBLR.JUMBLR_FUNCTIONS') }</p>
              <p>
                <strong>{ translate('JUMBLR.TIP') }:</strong> { translate('JUMBLR.TIP_DESC') }.
              </p>
            </div>
          </div>

          <div className="col-xlg-12 col-md-12 padding-top-20 padding-bottom-30">
            <div className="form-group col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding">
              <input
                type="radio"
                className="to-labelauty labelauty"
                name={ `mode-public` }
                id={ `mode-public` }
                checked={ this.state.jumblrMode === 'public' ? true : false } />
              <label
                htmlFor={ `mode-public` }
                className="no-margin"
                onClick={ () => this.switchJumblrMode('public') }>
                <span
                  className="labelauty-unchecked-image"
                  style={{ display: this.state.jumblrMode === 'public' ? 'none' : 'inline-block' }}></span>
                <span
                  className="labelauty-unchecked"
                  style={{ display: this.state.jumblrMode === 'public' ? 'none' : 'inline-block' }}>
                    { translate('JUMBLR.PUBLIC_NODE') }
                </span>
                <span
                  className="labelauty-checked-image"
                  style={{ display: this.state.jumblrMode === 'public' ? 'inline-block' : 'none' }}></span>
                <span
                  className="labelauty-checked"
                  style={{ display: this.state.jumblrMode === 'public' ? 'inline-block' : 'none' }}>
                    { translate('JUMBLR.PUBLIC_NODE') }
                </span>
              </label>
            </div>

            <div className="form-group col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding">
              <input
                type="radio"
                className="to-labelauty labelauty"
                name={ `mode-private` }
                id={ `mode-private` }
                checked={ this.state.jumblrMode === 'private' ? true : false } />
              <label
                htmlFor={ `mode-private` }
                className="no-margin"
                onClick={ () => this.switchJumblrMode('private') }>
                <span
                  className="labelauty-unchecked-image"
                  style={{ display: this.state.jumblrMode === 'private' ? 'none' : 'inline-block' }}></span>
                <span
                  className="labelauty-unchecked"
                  style={{ display: this.state.jumblrMode === 'private' ? 'none' : 'inline-block' }}>
                    { translate('JUMBLR.PRIVATE_NODE') }
                </span>
                <span
                  className="labelauty-checked-image"
                  style={{ display: this.state.jumblrMode === 'private' ? 'inline-block' : 'none' }}></span>
                <span
                  className="labelauty-checked"
                  style={{ display: this.state.jumblrMode === 'private' ? 'inline-block' : 'none' }}>
                    { translate('JUMBLR.PRIVATE_NODE') }
                </span>
              </label>
            </div>

            <div className="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding">
              <button
                type="button"
                className="btn btn-jumblr-warning waves-effect waves-light"
                onClick={ this._pauseJumblr }>
                <i className="fa fa-pause margin-right-10"></i>
                { translate('JUMBLR.PAUSE') }
              </button>
              <button
                type="button"
                className="btn btn-success waves-effect waves-light margin-left-20"
                onClick={ this._resumeJumblr }>
                <i className="fa fa-play margin-right-10"></i>
                { translate('JUMBLR.RESUME') }
              </button>
            </div>
          </div>

          <div className="col-xlg-12 col-md-12">
            { this.state.jumblrMode === 'public' &&
              <div className="jumblr-mode-selector nav-tabs-horizontal nav-tabs-inverse">
                <div className="img-responsive">
                  <span className="coin">{ this.props.ActiveCoin.coin }</span>
                  <img
                    className="image"
                    src={ `assets/images/cryptologo/${this.props.ActiveCoin.coin.toLowerCase()}.png` }
                    alt={ this.props.ActiveCoin.coin }/>
                </div>
                <ul className="nav nav-tabs">
                  <li
                    className={ this.state.activeTab === 0 ? 'active' : '' }
                    onClick={ () => this.openTab(0) }>
                    <a>{ translate('JUMBLR.USING_JUMBLR') }</a>
                  </li>
                  <li
                    className={ this.state.activeTab === 1 ? 'active' : '' }
                    onClick={ () => this.openTab(1) }>
                    <a>{ translate('JUMBLR.DEPOSIT_ADDRESS') }</a>
                  </li>
                  <li
                    className={ this.state.activeTab === 2 ? 'active' : '' }
                    onClick={ () => this.openTab(2) }>
                    <a>{ translate('JUMBLR.SECRET_ADDRESS') }</a>
                  </li>
                  <li
                    className={ this.state.activeTab === 3 ? 'active' : '' }
                    onClick={ () => this.openTab(3) }>
                    <a>{ translate('JUMBLR.DEPOSIT_FUNDS') }</a>
                  </li>
                </ul>
                <div className="tab-content padding-20">
                  <div className={ 'tab-pane' + (this.state.activeTab === 0 ? ' active' : '') }>
                    <button
                      type="button"
                      className="btn btn-success waves-effect waves-light margin-top-20 btn-next"
                      onClick={ () => this.openTab(1) }>
                      { translate('INDEX.NEXT') }
                    </button>
                    <h5>{ translate('JUMBLR.HOW_TO_USE') }</h5>
                    <ul>
                      <li>{ translate('JUMBLR.CREATE_DEPOSIT_ADDRESS') }</li>
                      <li>{ translate('JUMBLR.CREATE_SECRET_ADDRESS') }</li>
                      <li>{ translate('JUMBLR.SEND_FUNDS_TO_DEPOSIT') }</li>
                      <li>{ translate('JUMBLR.KEEP_WALLET_OPEN') }</li>
                      <li>{ translate('JUMBLR.IMPORTANT_FUNDS') }</li>
                      <li>{ translate('JUMBLR.LARGE_LOT') }</li>
                    </ul>
                    <p>{ this.renderLB('JUMBLR.EG') }</p>
                    <p>{ translate('JUMBLR.93_KMD') }</p>
                    <p>{ translate('JUMBLR.TO_CLEAR_THEM') }</p>
                    <p>{ translate('JUMBLR.WHEN_IT_TOTALS') }</p>
                  </div>
                  <div className={ 'tab-pane' + (this.state.activeTab === 1 ? ' active' : '') }>
                    <button
                      type="button"
                      className="btn btn-success waves-effect waves-light btn-next"
                      onClick={ () => this.openTab(2) }>{ translate('INDEX.NEXT') }</button>
                    <h5>{ translate('JUMBLR.FEW_SECURITY_NOTES') }</h5>
                    <div className="col-xs-12 nofloat">
                      <ul className="padding-bottom-20">
                        <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC1') }</li>
                        <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC2') }</li>
                        <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC3') }</li>
                        <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC4') }</li>
                        <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC5') }</li>
                      </ul>
                    </div>
                    { this.state.jumblrDepositAddressPBased &&
                      <div className="padding-bottom-30">
                        <div className="padding-bottom-20">
                          <p>
                            <strong>{ translate('JUMBLR.PLEASE_WRITE_DOWN_PASSPHRASE') }</strong>
                          </p>
                          <p>{ translate('JUMBLR.THIS_IS_YOUR_MAIN_RECOVERY') }</p>
                          <p>{ translate('JUMBLR.ALL_JUMBLR_ADDRESSES_CAN_BE') }</p>
                          <p>
                            <strong>{ translate('JUMBLR.TIP') }:</strong> { this.renderLB('JUMBLR.DONT_USE_SMART_EDITORS') }
                          </p>
                        </div>
                        <label>{ translate('INDEX.PASSPHRASE') }</label>
                        <input
                          type="text"
                          className="form-control"
                          name="loginPassphrase"
                          onChange={ this.returnPassphrase }
                          value={ this.state.randomSeed } />
                        <button
                          className="btn btn-default btn-xs clipboard-edexaddr copy-string-btn"
                          title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                          onClick={ () => this.copyPassphrase() }>
                            <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
                        </button>
                      </div>
                    }
                    <button
                      type="button"
                      className="btn btn-info waves-effect waves-light"
                      onClick={ this.generateJumblrDepositAddress }>
                      { translate('JUMBLR.CREATE_JUMBLR_DEPOSIT_ADDRESS') }
                    </button>
                    { this.state.jumblrDepositAddress &&
                      this.state.jumblrDepositAddress.address &&
                      <div className="padding-top-40">
                        <strong>{ translate('JUMBLR.YOUR_JUMBLR_DEPOSIT_ADDRESS') }:</strong>
                        <p>
                          { this.state.jumblrDepositAddress.address }
                          <button
                            className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
                            title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                            onClick={ () => this._copyCoinAddress(this.state.jumblrDepositAddress.address) }>
                              <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
                          </button>
                        </p>
                        <p>
                          { this.state.jumblrDepositAddress.wif }
                          <button
                            className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
                            title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                            onClick={ () => this._copyCoinAddress(this.state.jumblrDepositAddress.wif) }>
                              <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
                          </button>
                        </p>
                      </div>
                    }
                  </div>
                  <div className={ 'tab-pane' + (this.state.activeTab === 2 ? ' active' : '') }>
                    <button
                      type="button"
                      className="btn btn-success waves-effect waves-light margin-top-20 btn-next"
                      onClick={ () => this.openTab(3) }>
                      { translate('INDEX.NEXT') }
                    </button>
                    <p>{ translate('JUMBLR.JUMBLR_SECRET_DESC_P1') }</p>
                    <p>{ translate('JUMBLR.JUMBLR_SECRET_DESC_P2') }</p>
                    <p>{ translate('JUMBLR.JUMBLR_SECRET_DESC_P3') }</p>
                    <p>{ translate('JUMBLR.JUMBLR_SECRET_DESC_P4') }</p>
                    <p>
                      { translate('JUMBLR.JUMBLR_SECRET_DESC_P5') }&nbsp;
                      <code>jumblr muffin smart educate tomato boss foil open dirt opinion pizza goddess skate action card garden cotton life write life note shine myself gloom summer XXX</code>.&nbsp;
                      { translate('JUMBLR.JUMBLR_SECRET_DESC_P6') }.
                    </p>

                    { this.state.jumblrDepositAddressPBased &&
                      <div className="padding-bottom-20 padding-top-20">
                        <label>{ translate('JUMBLR.PASSPHRASE') }</label>
                        <input
                          type="text"
                          className="form-control"
                          name="jumblrPassphrase"
                          onChange={ this.returnPassphrase }
                          value={ this.state.randomSeed } />
                        <button
                          className="btn btn-default btn-xs clipboard-edexaddr copy-string-btn"
                          title={ translate('INDEX.COPY_TO_CLIPBOARD') }
                          onClick={ () => this.copyPassphrase() }>
                            <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
                        </button>
                      </div>
                    }
                    <div className="col-xs-2 nofloat padding-top-30">
                      { translate('JUMBLR.NUMBER_OF_SECRET_ADDR') }
                    </div>
                    <div className="col-xs-2 nofloat padding-left-10">
                      <input
                        type="text"
                        pattern="[0-9]*"
                        className="form-control"
                        name="secretAddressCount"
                        min="1"
                        max="777"
                        onChange={ this.onChange }
                        value={ this.state.secretAddressCount } />
                    </div>
                    <div className="col-xs-2 nofloat">
                      <button
                        type="button"
                        className="btn btn-info waves-effect waves-light"
                        onClick={ this.generateJumblrSecretAddress }>
                        { translate('JUMBLR.CREATE_JUMBLR_SECRET_ADDR') }
                      </button>
                    </div>
                    <div className="toggle-box padding-top-20">
                      <span className="pointer">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={ this.state.jumblrSecretAddressShow } />
                          <div
                            className="slider"
                            onClick={ () => this.toggle('jumblrSecretAddressShow') }></div>
                        </label>
                        <div
                          className="toggle-label"
                          onClick={ () => this.toggle('jumblrSecretAddressShow') }>
                            { translate('JUMBLR.SHOW_ADDRESS_LIST') }
                        </div>
                      </span>
                    </div>
                    <div className="col-xlg-12 col-md-12 padding-top-20 nofloat">
                      { this.state.jumblrSecretAddressShow &&
                        this.checkJumblrSecretAddressListLength('gen') &&
                        <table className="table table-hover dataTable table-striped">
                          <thead>
                            <tr>
                              <td>
                                <strong>{ translate('INDEX.ADDRESS') }</strong>
                              </td>
                              <td>
                                <strong>Wif</strong>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                          { this._JumblrRenderSecretAddressList('gen') }
                          </tbody>
                        </table>
                      }
                    </div>
                  </div>
                  <div className={ 'tab-pane' + (this.state.activeTab === 3 ? ' active' : '') }>
                    <p>{ translate('JUMBLR.DEPOSIT_FORM_P1') }</p>
                    <p className="padding-bottom-20">{ translate('JUMBLR.DEPOSIT_FORM_P2') }</p>
                    <SendCoin
                      renderFormOnly="true"
                      activeSection="send" />
                  </div>
                </div>
              </div>
            }
            { this.state.jumblrMode === 'private' &&
              <div className="jumblr-mode-selector nav-tabs-horizontal nav-tabs-inverse">
                <ul className="nav nav-tabs">
                  <li
                    className={ this.state.activeTab === 0 ? 'active' : '' }
                    onClick={ () => this.openTab(0) }>
                    <a>{ translate('JUMBLR.IMPORT_SECRET_ADDRESS') }</a>
                  </li>
                  <li
                    className={ this.state.activeTab === 1 ? 'active' : '' }
                    onClick={ () => this.openTab(1) }>
                    <a>{ translate('JUMBLR.CHECK_FUNDS') }</a>
                  </li>
                </ul>
                <div className="tab-content padding-20">
                  <div className={ 'tab-pane' + (this.state.activeTab === 0 ? ' active' : '') }>
                    <button
                      type="button"
                      className="btn btn-success waves-effect waves-light margin-top-20 btn-next"
                      onClick={ () => this.openTab(1) }>
                      { translate('INDEX.NEXT') }
                    </button>
                    <div className="col-xlg-12 col-md-12 nofloat">
                      <p>{ translate('JUMBLR.SECRET_REGEN_DESC_P1') }</p>
                      <p>
                        { translate('JUMBLR.SECRET_REGEN_DESC_P2') }:&nbsp;
                        <code>jumblr muffin smart educate tomato boss foil open dirt opinion pizza goddess skate action card garden cotton life write life note shine myself gloom summer</code>.
                      </p>
                      <p>{ translate('JUMBLR.SECRET_REGEN_DESC_P3') }</p>
                      <p>{ translate('JUMBLR.SECRET_REGEN_DESC_P4') }</p>
                      { this.state.jumblrDepositAddressPBased &&
                        <div className="padding-bottom-20 padding-top-20">
                          <label>{ translate('INDEX.PASSPHRASE') }</label>
                          <input
                            type="text"
                            className="form-control"
                            name="jumblrPassphraseImport"
                            onChange={ (event) => this.passphraseOnChange(event) }
                            value={ this.state.jumblrPassphraseImport } />
                        </div>
                      }
                      <div className="col-xs-2 nofloat padding-top-30">
                        { translate('JUMBLR.NUMBER_OF_SECRET_ADDR') }
                      </div>
                      <div className="col-xs-2 nofloat padding-left-10">
                        <input
                          type="text"
                          pattern="[0-9]*"
                          className="form-control"
                          name="secretAddressCountImport"
                          min="1"
                          max="777"
                          onChange={ this.onChange }
                          value={ this.state.secretAddressCountImport } />
                      </div>
                      <div className="col-xs-2 nofloat">
                        <button
                          type="button"
                          className="btn btn-info waves-effect waves-light"
                          onClick={ this.importJumblrSecretAddress }>
                          { translate('JUMBLR.IMPORT_JUMLR_SECRET_ADDRESSES') }
                        </button>
                      </div>
                      <div className="toggle-box padding-top-20">
                        <span className="pointer">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={ this.state.jumblrSecretAddressShowImport } />
                            <div
                              className="slider"
                              onClick={ () => this.toggle('jumblrSecretAddressShowImport') }></div>
                          </label>
                          <div
                            className="toggle-label"
                            onClick={ () => this.toggle('jumblrSecretAddressShowImport') }>
                              { translate('JUMBLR.SHOW_ADDRESS_LIST') }
                          </div>
                        </span>
                      </div>
                      <div className="col-xlg-12 col-md-12 padding-top-20 nofloat">
                        { this.state.jumblrSecretAddressShowImport &&
                          this.checkJumblrSecretAddressListLength('import') &&
                          <table className="table table-hover dataTable table-striped">
                            <thead>
                              <tr>
                                <td>
                                  <strong>{ translate('INDEX.ADDRESS') }</strong>
                                </td>
                                <td>
                                  <strong>Wif</strong>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                            { this._JumblrRenderSecretAddressList('import') }
                            </tbody>
                          </table>
                        }
                      </div>
                    </div>
                  </div>
                  <div className={ 'tab-pane' + (this.state.activeTab === 1 ? ' active' : '') }>
                    <ReceiveCoin
                      activeSection="receive"
                      renderTableOnly="true" />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumblrRender;