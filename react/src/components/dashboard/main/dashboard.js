import React from 'react';
import { connect } from 'react-redux';
import DashboardRender from './dashboard.render';
import {
  toggleZcparamsFetchModal,
  triggerToaster,
} from '../../../actions/actionCreators';
import zcashParamsCheckErrors from '../../../util/zcashParams';
import Store from '../../../store';
import mainWindow from '../../../util/mainWindow';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      zcashParamsVerifyTriggered: false,
    };
    this.renderDashboard = this.renderDashboard.bind(this);
    this.verifyZcashParams = this.verifyZcashParams.bind(this);
  }

  verifyZcashParams() {
    if (!this.state.zcashParamsVerifyTriggered) {
      const _res = mainWindow.zcashParamsExist;
      const _errors = zcashParamsCheckErrors(_res);

      if (_errors) {
        Store.dispatch(
          triggerToaster(
            _errors,
            'Komodo',
            'error',
            false
          )
        );

        Store.dispatch(toggleZcparamsFetchModal(true));
      }
    } else {
      this.setState({
        zcashParamsVerifyTriggered: false,
      });
    }
  }

  componentWillReceiveProps() {
    if (this.props.Main &&
        this.props.Main.coins &&
        this.props.Main.coins.native &&
        this.props.Main.coins.native.length &&
        !this.props.Dashboard.displayZcparamsModal) {
      this.setState({
        zcashParamsVerifyTriggered: true,
      });
      this.verifyZcashParams();
    }
  }

  isSectionActive(section) {
    return this.props.Dashboard.activeSection === section;
  }

  renderDashboard() {
    document.body.className = '';

    return DashboardRender.call(this);
  }

  displayDashboard() {
    return this.props &&
      (this.props.Main &&
      this.props.Main.coins &&
      this.props.Main.coins.native &&
      this.props.Main.coins.native.length &&
      !this.props.Main.coins.spv.length) ||
      (this.props.Main &&
      this.props.Main.coins &&
      this.props.Main.coins.spv &&
      this.props.Main.coins.spv.length &&
      this.props.Main.isLoggedIn) ||
      (this.props.Main &&
      this.props.Main.coins &&
      this.props.Main.coins.native &&
      this.props.Main.coins.native.length &&
      !this.props.Main.coins.spv.length &&
      this.props.Main.isLoggedIn);
  }

  render() {
    if (this.displayDashboard()) {
      return this.renderDashboard();
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    Main: state.Main,
    ActiveCoin: {
      mode: state.ActiveCoin.mode,
    },
    Dashboard: state.Dashboard,
  };
};

export default connect(mapStateToProps)(Dashboard);
