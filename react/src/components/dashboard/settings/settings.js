import React from 'react';
import { connect } from 'react-redux';
import { translate } from '../../../translate/translate';
import {
  getAppConfig,
  getAppInfo,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import {
  SettingsRender,
} from './settings.render';
import mainWindow from '../../../util/mainWindow';

/*
  TODO:
  1) add fiat section
  2) batch export/import wallet addresses
*/
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExperimentalOn: false,
    };
    this.displaySPVServerListTab = this.displaySPVServerListTab.bind(this);
  }

  displaySPVServerListTab() {
    if (this.props.Main &&
        this.props.Main.coins &&
        this.props.Main.coins.spv) {
      for (let i = 0; i < this.props.Main.coins.spv.length; i++) {
        if (this.props.Dashboard.electrumCoins[this.props.Main.coins.spv[i]].serverList) {
          return true;
        }
      }
    }
  }

  componentDidMount(props) {
    Store.dispatch(getAppConfig());
    Store.dispatch(getAppInfo());

    document.getElementById('section-iguana-wallet-settings').setAttribute('style', 'height:auto; min-height: 100%');
  }

  componentWillMount() {
    this.setState({
      isExperimentalOn: mainWindow.appConfig.experimentalFeatures,
    });
  }

  render() {
    return SettingsRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    Main: state.Main,
    Dashboard: state.Dashboard,
  };
};

export default connect(mapStateToProps)(Settings);
