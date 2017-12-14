import React from 'react';
import { translate } from '../../../translate/translate';
import mainWindow from '../../../util/mainWindow';

const NavbarRender = function() {
  return (
    <nav className="site-navbar navbar navbar-default navbar-fixed-top navbar-mega">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle hamburger hamburger-close navbar-toggle-left hided">
          <span className="sr-only">{ translate('INDEX.TOGGLE_NAV') }</span>
          <span className="hamburger-bar"></span>
        </button>
        <button
          type="button"
          className="navbar-toggle collapsed">
          <i className="icon md-more"></i>
        </button>
        <div className="navbar-brand navbar-brand-center site-gridmenu-toggle">
          <img
            className="navbar-brand-logo hidden-xs"
            src="assets/images/agama-logo-side.svg"
            height="100"
            width="100"
            title={ translate('ABOUT.AGAMA_WALLET') } />
          <img
            className="navbar-brand-logo hidden-md hidden-sm hidden-lg"
            src="assets/images/agama-icon.svg"
            title={ translate('ABOUT.AGAMA_WALLET') } />
          <span className="navbar-brand-text hidden-xs"></span>
        </div>
        <button
          type="button"
          className="navbar-toggle collapsed">
          <span className="sr-only">{ translate('INDEX.TOGGLE_SEARCH') }</span>
          <i className="icon md-search"></i>
        </button>
      </div>
      <div className="navbar-container container-fluid">
        <div className="collapse navbar-collapse navbar-collapse-toolbar">
          <ul className="nav navbar-toolbar">
            <li className="hidden-float hide">
              <a>
                <i className="icon hamburger hamburger-arrow-left">
                  <span className="sr-only">{ translate('INDEX.TOGGLE_MENUBAR') }</span>
                  <span className="hamburger-bar"></span>
                </i>
              </a>
            </li>
            <li className={ this.isSectionActive('wallets') ? 'active nav-top-menu' : 'nav-top-menu' }>
              <a onClick={ () => this.dashboardChangeSection('wallets') }>
                <i className="site-menu-icon"></i> { translate('INDEX.WALLETS') }
              </a>
            </li>
            <li className={ (this.isSectionActive('dex') ? 'active nav-top-menu' : 'nav-top-menu') + (mainWindow.argv.indexOf('dexonly') > -1 ? '' : ' hide') }>
              <a onClick={ () => this.dashboardChangeSection('dex') }>
                <i className="site-menu-icon"></i> BarterDEX
              </a>
            </li>
            { this.props.ActiveCoin &&
              (/*this._checkAC() || */this.props.ActiveCoin.coin === 'KMD' &&
                this.props.ActiveCoin.mode === 'native') &&
              <li className={ this.isSectionActive('jumblr') ? 'active nav-top-menu' : 'nav-top-menu' }>
                <a onClick={ () => this.dashboardChangeSection('jumblr') }>
                  <i className="site-menu-icon"></i> Jumblr
                </a>
              </li>
            }
            { this.props.ActiveCoin.coin !== 'CHIPS' &&
              this.props.ActiveCoin.mode !== 'spv' &&
              <li className="nav-top-menu">
                <a onClick={ this.openImportKeyModal }>
                  <i className="site-menu-icon"></i> { translate('IMPORT_KEY.IMPORT_KEY') }
                </a>
              </li>
            }
          </ul>
          <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
            <li>
              <a
                className="pointer padding-bottom-10 padding-top-16"
                onClick={ this.toggleAddCoinModal }>
                <span>
                  <img
                    src="assets/images/icons/activatecoin.png"
                    alt={ translate('INDEX.ADD_COIN') } />
                </span>
              </a>
            </li>
            <li
              className={ 'pointer dropdown' + (this.state.openDropMenu ? ' open' : '') }
              onClick={ this.openDropMenu }>
              <a className="navbar-avatar dropdown-toggle">
                <span className="avatar avatar-online">
                  <img
                    src="assets/images/iguana_profile_02.jpg"
                    alt="iguana" />
                  <i></i>
                </span>
              </a>
              <ul className="dropdown-menu">
                { !this.isSectionActive('settings') &&
                  <li>
                    <a onClick={ () => this.dashboardChangeSection('settings') }>
                      <i className="icon md-settings"></i> { translate('INDEX.SETTINGS') }
                    </a>
                  </li>
                }
                { !this.isSectionActive('about') &&
                  <li>
                    <a onClick={ () => this.dashboardChangeSection('about') }>
                      <i className="icon fa-users"></i> { translate('ABOUT.ABOUT_AGAMA') }
                    </a>
                  </li>
                }
                { this.isRenderSpvLockLogout() &&
                  <li>
                    <a onClick={ this.spvLock }>
                      <i className="icon fa-lock"></i> Soft logout
                    </a>
                  </li>
                }
                { this.isRenderSpvLockLogout() &&
                  <li>
                    <a onClick={ this.spvLogout }>
                      <i className="icon fa-power-off"></i> Complete logout
                    </a>
                  </li>
                }
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarRender;