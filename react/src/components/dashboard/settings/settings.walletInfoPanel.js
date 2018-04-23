import React from 'react';
import translate from '../../../translate/translate';
import { connect } from 'react-redux';

class WalletInfoPanel extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th width="10%">{ translate('INDEX.KEY') }</th>
            <th>{ translate('INDEX.VALUE') }</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="wallet-info-key">pubkey</td>
            <td>{ this.props.Main.activeHandle.pubkey }</td>
          </tr>
          <tr>
            <td className="wallet-info-key">btcpubkey</td>
            <td>{ this.props.Main.activeHandle.btcpubkey }</td>
          </tr>
          <tr>
            <td className="wallet-info-key">rmd160</td>
            <td>{ this.props.Main.activeHandle.rmd160 }</td>
          </tr>
          <tr>
            <td className="wallet-info-key">NXT</td>
            <td>{ this.props.Main.activeHandle.NXT }</td>
          </tr>
          <tr>
            <td className="wallet-info-key">notary</td>
            <td>{ this.props.Main.activeHandle.notary }</td>
          </tr>
          <tr>
            <td className="wallet-info-key">status</td>
            <td>{ this.props.Main.activeHandle.status }</td>
          </tr>
        </tbody>
      </table>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    Main: {
      activeHandle: state.Main.activeHandle,
    },
  };
};

export default connect(mapStateToProps)(WalletInfoPanel);