import React from 'react';
import { connect } from 'react-redux';
import Toaster from '../toaster/toaster';
import AddCoin from '../addcoin/addcoin';
import Login from '../login/login';
import Dashboard from '../dashboard/main/dashboard';
import DexMain from '../dex/dexMain';
import mainWindow from '../../util/mainWindow';

class WalletMain extends React.Component {
  render() {
    if (mainWindow.argv.indexOf('dexonly') > -1) {
      return (
        <div className="full-height">
          <input
            type="text"
            id="js-copytextarea" />
          <DexMain />
        </div>
      );
    } else {
      return (
        <div className="full-height">
          <input
            type="text"
            id="js-copytextarea" />
          <Dashboard />
          <AddCoin />
          <Login />
          <Toaster {...this.props.toaster} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    toaster: state.toaster,
  };
};

export default connect(mapStateToProps)(WalletMain);

