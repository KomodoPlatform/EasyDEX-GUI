import React from 'react';
import { translate } from '../../../translate/translate';
import { connect } from 'react-redux';
import mainWindow from '../../../util/mainWindow';

class AppInfoPanel extends React.Component {
  constructor() {
    super();
  }

  render() {
    const releaseInfo = this.props.Settings.appInfo && this.props.Settings.appInfo.releaseInfo;

    if (!releaseInfo) {
      return null
    } else {
      let _items = [];
      let _ports = mainWindow.getAssetChainPorts()

      for (let key in _ports) {
        _items.push(
          <span key={ `settings-coind-ports-${key}` }>
            { key === 'komodod' ? 'KMD' : key }: { _ports[key] }<br />
          </span>
        );
      }

      return (
        <div className="row">
          <div className="col-sm-12 padding-top-15">
            <h5>{ translate('SETTINGS.APP_RELEASE') }</h5>
            <p>
              { translate('SETTINGS.NAME') }: { this.props.Settings.appInfo.releaseInfo.name }
              <br />
              { translate('SETTINGS.VERSION') }: { `${this.props.Settings.appInfo.releaseInfo.version.replace('version=', '')}${mainWindow.arch === 'x64' ? '' : '-32bit'}-beta` }
              <br />
              { translate('SETTINGS.APP_SESSION') }: { this.props.Settings.appInfo.appSession }
            </p>
            <h5>{ translate('SETTINGS.SYS_INFO') }</h5>
            <p>
              { translate('SETTINGS.ARCH') }: { this.props.Settings.appInfo.sysInfo.arch }
              <br />
              { translate('SETTINGS.OS_TYPE') }: { this.props.Settings.appInfo.sysInfo.os_type }
              <br />
              { translate('SETTINGS.OS_PLATFORM') }: { this.props.Settings.appInfo.sysInfo.platform }
              <br />
              { translate('SETTINGS.OS_RELEASE') }: { this.props.Settings.appInfo.sysInfo.os_release }
              <br />
              { translate('SETTINGS.CPU') }: { this.props.Settings.appInfo.sysInfo.cpu }
              <br />
              { translate('SETTINGS.CPU_CORES') }: { this.props.Settings.appInfo.sysInfo.cpu_cores }
              <br />
              { translate('SETTINGS.MEM') }: { this.props.Settings.appInfo.sysInfo.totalmem_readable }
            </p>
            { mainWindow.arch === 'x64' &&
              <h5>{ translate('SETTINGS.LOCATIONS') }</h5>
            }
            { mainWindow.arch === 'x64' &&
              <p>
                { translate('SETTINGS.CACHE') }: { this.props.Settings.appInfo.dirs.cacheLocation }
                <br />
                { translate('SETTINGS.CONFIG') }: { this.props.Settings.appInfo.dirs.configLocation }
                <br />
                Komodo { translate('SETTINGS.BIN') }: { this.props.Settings.appInfo.dirs.komododBin }
                <br />
                Komodo { translate('SETTINGS.DIR') }: { this.props.Settings.appInfo.dirs.komodoDir }
                <br />
                Komodo wallet.dat: { this.props.Settings.appInfo.dirs.komodoDir }
              </p>
            }
            { mainWindow.arch === 'x64' &&
              <h5>Daemon ports</h5>
            }
            { mainWindow.arch === 'x64' &&
              <p>{ _items }</p>
            }
          </div>
        </div>
      );
    }
  };
}

const mapStateToProps = (state) => {
  return {
    Settings: state.Settings,
  };
};

export default connect(mapStateToProps)(AppInfoPanel);