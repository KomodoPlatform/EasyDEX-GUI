import React from 'react';
import { connect } from 'react-redux';
import translate from '../../../translate/translate';
import { shepherdCli } from '../../../actions/actionCreators';
import Store from '../../../store';

class CliPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      cliCmdString: '',
      cliCoin: null,
      cliResponse: null,
    };
  }

  renderActiveCoinsList(mode) {
    const modes = [
      'native',
      'full'
    ];

    const allCoins = this.props.Main.coins;
    let items = [];

    if (allCoins) {
      if (mode === 'all') {
        modes.map((mode) => {
          allCoins[mode].map((coin) => {
            items.push(
              <option
                value={ coin }
                key={ coin }>
                { coin } ({ mode })
              </option>
            );
          });
        });
      } else {
        allCoins[mode].map((coin) => {
          items.push(
            <option
              value={ coin }
              key={ coin }>
              { coin } ({ mode })
            </option>
          );
        });
      }

      return items;
    } else {
      return null;
    }
  }

  // TODO: rerender only if prop is changed
  renderCliResponse() {
    const _cliResponse = this.props.Settings.cli;
    let _items = [];

    if (_cliResponse) {
      let _cliResponseParsed;
      let responseType;

      try {
        _cliResponseParsed = JSON.parse(_cliResponse.result);
      } catch(e) {
        _cliResponseParsed = _cliResponse.result;
      }

      if (Object.prototype.toString.call(_cliResponseParsed) === '[object Array]') {
        responseType = 'array';

        for (let i = 0; i < _cliResponseParsed.length; i++) {
          _items.push(
            <div key={ `cli-response-${Math.random(0, 9) * 10}` }>{ JSON.stringify(_cliResponseParsed[i], null, '\t') }</div>
          );
        }
      }
      if (Object.prototype.toString.call(_cliResponseParsed) === '[object]' ||
          typeof _cliResponseParsed === 'object') {
        responseType = 'object';

        _items.push(
          <div key={ `cli-response-${Math.random(0, 9) * 10}` }>{ JSON.stringify(_cliResponseParsed, null, '\t') }</div>
        );
      }
      if (Object.prototype.toString.call(_cliResponseParsed) === 'number' ||
          typeof _cliResponseParsed === 'boolean' ||
          _cliResponseParsed === 'wrong cli string format') {
        responseType = 'number';

        _items.push(
          <div key={ `cli-response-${Math.random(0, 9) * 10}` }>{ _cliResponseParsed.toString() }</div>
        );
      }

      if (responseType !== 'number' &&
          responseType !== 'array' &&
          responseType !== 'object' &&
          _cliResponseParsed.indexOf('\n') > -1) {
        _cliResponseParsed = _cliResponseParsed.split('\n');

        for (let i = 0; i < _cliResponseParsed.length; i++) {
          _items.push(
            <div key={ `cli-response-${Math.random(0, 9) * 10}` }>{  _cliResponseParsed[i] }</div>
          );
        }
      }

      return (
        <div>
          <div>
            <strong>{ translate('SETTINGS.CLI_RESPONSE') }:</strong>
          </div>
          { _items }
        </div>
      );
    } else {
      return null;
    }
  }

  execCliCmd() {
    Store.dispatch(
      shepherdCli(
        'passthru',
        this.state.cliCoin,
        this.state.cliCmdString
      )
    );
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
        <p>{ translate('INDEX.CLI_SELECT_A_COIN') }</p>
        <form
          className="execute-cli-cmd-form"
          method="post"
          action="javascript:"
          autoComplete="off">
          <div className="form-group form-material floating">
            <select
              className="form-control form-material"
              name="cliCoin"
              id="settingsCliOptions"
              onChange={ this.updateInput }>
              <option>{ translate('INDEX.CLI_NATIVE_COIN') }</option>
              { this.renderActiveCoinsList('native') }
            </select>
            <label
              className="floating-label"
              htmlFor="settingsDelectDebugLogOptions">{ translate('INDEX.COIN') }</label>
          </div>
          <div className="form-group form-material floating">
            <textarea
              type="text"
              className="form-control"
              name="cliCmdString"
              id="cliCmd"
              value={ this.state.cliCmdString }
              onChange={ this.updateInput }></textarea>
            <label
              className="floating-label"
              htmlFor="readDebugLogLines">{ translate('INDEX.TYPE_CLI_CMD') }</label>
          </div>
          <div className="col-sm-12 col-xs-12 text-align-center">
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light"
              disabled={ !this.state.cliCoin || !this.state.cliCmdString }
              onClick={ () => this.execCliCmd() }>{ translate('INDEX.EXECUTE') }</button>
          </div>
          <div className="col-sm-12 col-xs-12 text-align-left">
            <div className="padding-top-40 padding-bottom-20 horizontal-padding-0">
              { this.renderCliResponse() }
            </div>
          </div>
        </form>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    Main: {
      coins: state.Main.coins,
    },
    Settings: state.Settings,
  };
};

export default connect(mapStateToProps)(CliPanel);