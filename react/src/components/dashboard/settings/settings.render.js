import React from 'react';
import translate from '../../../translate/translate';
import PanelSection from './settings.panelBody';
import Panel from './settings.panel';

import AppUpdatePanel from  './settings.appUpdatePanel';
import AppInfoPanel from  './settings.appInfoPanel';
import AppSettingsPanel from './settings.appSettingsPanel';
import CliPanel from './settings.cliPanel';
import DebugLogPanel from './settings.debugLogPanel';
// import FiatCurrencyPanel from './settings.fiatCurrencyPanel';
import ExportKeysPanel from './settings.exportKeysPanel';
// import ImportKeysPanel from './settings.importKeysPanel';
import SPVServersPanel from './settings.spvServersPanel';
import DaemonStdoutPanel from './settings.daemonStdoutPanel';
import NativeWalletDatKeysPanel from './settings.nativeWalletDatKeysPanel';
import CoindClearDataDirPanel from './settings.coindClearDataDirPanel';
import Bip39KeysPanel from './settings.bip39KeysPanel';
import mainWindow from '../../../util/mainWindow';

// import WalletBackupPanel from './settings.walletBackupPanel';

/*
              { !this.props.disableWalletSpecificUI &&
                <PanelSection
                  title={ translate('INDEX.ADD_NODE') }
                  icon="icon md-plus-square">
                  <AddNodePanel />
                </PanelSection>
              }
              { !this.props.disableWalletSpecificUI &&
                <PanelSection
                  title={ translate('INDEX.WALLET_BACKUP') }
                  icon="icon wb-briefcase">
                  <WalletBackupPanel />
                </PanelSection>
              }
              { !this.props.disableWalletSpecificUI &&
                <PanelSection
                  title={ translate('INDEX.FIAT_CURRENCY') }
                  icon="icon fa-money">
                  <FiatCurrencyPanel />
                </PanelSection>
              }
              { !this.props.disableWalletSpecificUI &&
                <PanelSection
                  title={ translate('INDEX.IMPORT_KEYS') }
                  icon="icon md-key">
                  <ImportKeysPanel />
                </PanelSection>
              }
*/

export const SettingsRender = function() {
  return (
    <div
      id="section-iguana-wallet-settings"
      className="padding-30">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="font-size-14 text-uppercase">{ translate('INDEX.WALLET_SETTINGS') }</h4>
            <Panel
              uniqId={ 'SettingsAccordion' }
              singleOpen={ true }>
              { mainWindow.arch === 'x64' &&
                <PanelSection
                  title={ translate('INDEX.DEBUG_LOG') }
                  icon="icon fa-bug"
                  openByDefault={ this.props.disableWalletSpecificUI }>
                  <DebugLogPanel />
                </PanelSection>
              }
              { this.props.Main.coins &&
                this.props.Main.coins.native &&
                Object.keys(this.props.Main.coins.native).length > 0 &&
                <PanelSection
                  title={ 'Komodod stdout' }
                  icon="icon fa-bug">
                  <DaemonStdoutPanel />
                </PanelSection>
              }
              { mainWindow.arch === 'x64' &&
                <PanelSection
                  title={ translate('SETTINGS.APP_CONFIG') + ' (config.json)' }
                  icon="icon fa-wrench">
                  <AppSettingsPanel />
                </PanelSection>
              }
              <PanelSection
                title={ translate('SETTINGS.APP_INFO') }
                icon="icon md-info">
                <AppInfoPanel />
              </PanelSection>
              { this.props.Main.coins &&
                this.props.Main.coins.spv &&
                Object.keys(this.props.Main.coins.spv).length &&
                this.props.Main.isLoggedIn &&
                <PanelSection
                  title={ translate('INDEX.EXPORT_KEYS') }
                  icon="icon md-key">
                  <ExportKeysPanel />
                </PanelSection>
              }
              { mainWindow.arch === 'x64' &&
                <PanelSection
                  title={ `Wallet.dat ${translate('SETTINGS.KEYS_SM')}` }
                  icon="icon md-key">
                  <NativeWalletDatKeysPanel />
                </PanelSection>
              }
              <PanelSection
                title={ `BIP39 ${translate('SETTINGS.KEYS_CAP')}` }
                icon="icon fa-usb">
                <Bip39KeysPanel />
              </PanelSection>
              { mainWindow.arch === 'x64' &&
                <PanelSection
                  title={ translate('SETTINGS.CLEAR_NATIVE_DATADIR') }
                  icon="icon fa-trash">
                  <CoindClearDataDirPanel />
                </PanelSection>
              }
              { this.props.Main.coins &&
                this.props.Main.coins.spv &&
                Object.keys(this.props.Main.coins.spv).length &&
                this.displaySPVServerListTab() &&
                <PanelSection
                  title={ translate('SETTINGS.SPV_SERVERS') }
                  icon="icon fa-server">
                  <SPVServersPanel />
                </PanelSection>
              }
              { this.props.Main.coins &&
                this.props.Main.coins.native &&
                Object.keys(this.props.Main.coins.native).length > 0 &&
                <PanelSection
                  title="CLI"
                  icon="icon fa-code">
                  <CliPanel />
                </PanelSection>
              }
              { this.state.isExperimentalOn &&
                <PanelSection
                  title={ translate('INDEX.UPDATE') }
                  icon="icon fa fa-cloud-download">
                  <AppUpdatePanel />
                </PanelSection>
              }
            </Panel>
          </div>
        </div>
      </div>
  );
};