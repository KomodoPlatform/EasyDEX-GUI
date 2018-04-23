import React from 'react';
import translate from '../../../translate/translate';
import mainWindow from '../../../util/mainWindow';

class ToolsPubCheck extends React.Component {
  constructor() {
    super();
    this.state = {
      pub: '',
      pubResult: null,
    };
    this.updateInput = this.updateInput.bind(this);
    this.pubCheck = this.pubCheck.bind(this);
  }

  pubCheck() {
    this.setState({
      pubResult: mainWindow.getCoinByPub(this.state.pub),
    });
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="row margin-left-10">
        <div className="col-xlg-12 form-group form-material no-padding-left padding-bottom-10">
          <h4>Pub address version check</h4>
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left padding-top-10 padding-bottom-20">
          <label
            className="control-label col-sm-1 no-padding-left"
            htmlFor="kmdWalletSendTo">Pub address</label>
          <input
            type="text"
            className="form-control col-sm-3"
            name="pub"
            onChange={ this.updateInput }
            value={ this.state.pub }
            placeholder="Enter a pub address"
            autoComplete="off"
            required />
        </div>
        <div className="col-sm-12 form-group form-material no-padding-left margin-top-10 padding-bottom-10">
          <button
            type="button"
            className="btn btn-info col-sm-2"
            onClick={ this.pubCheck }>
              Check version
          </button>
        </div>
        { this.state.pubResult &&
          <div className="col-sm-12 form-group form-material no-padding-left margin-top-10">
          { this.state.pubResult.coin &&
            <div>
              <div>Coin(s): {
                this.state.pubResult.coin.map((item) => {
                  return(<div key={ `tools-pub-check-${item}` }>{ item }</div>);
                })
              }</div>
              <div className="margin-top-10">Version: { this.state.pubResult.version }</div>
            </div>
          }
          { !this.state.pubResult.coin &&
            <div>{ this.state.pubResult }</div>
          }
          </div>
        }
      </div>
    );
  }
}

export default ToolsPubCheck;