import React from 'react';
import Store from '../../store';
import { translate } from '../../translate/translate';
import {
  shepherdMMStart,
  shepherdMMCachePreloadState,
} from '../../actions/actionCreators';
import { PassPhraseGenerator } from '../../util/crypto/passphrasegenerator';
import mainWindow from '../../util/mainWindow';
import SVGFaviconColor from './svg/faviconColor';
import SVGCopy from './svg/copy';
import SVGChevronRight from './svg/chevronRight';
import SVGCheck from './svg/check';

class DexLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      isNewPassphrase: false,
      passphrase: null,
    };
    this.updateInput = this.updateInput.bind(this);
    this.generateNewSeed = this.generateNewSeed.bind(this);
    this.startMM = this.startMM.bind(this);
  }

  startMM() {
    shepherdMMStart(this.state.passphrase)
    .then((res) => {
      this.setState({
        isNewPassphrase: false,
        passphrase: null,
      });

      mainWindow.getMMCacheData()
      .then((res) => {
        console.warn('mm cache', res);

        const { rates, coins, isAuth, swaps, asks, bids, pair, coinsHelper, electrumServersList } = res;
        Store.dispatch(shepherdMMCachePreloadState(isAuth, asks, bids, pair, coins, swaps, rates, coinsHelper, electrumServersList));
      });
    });
  }

  generateNewSeed() {
    this.setState(Object.assign({}, this.state, {
      isNewPassphrase: true,
      passphrase: PassPhraseGenerator.generatePassPhrase(256),
    }));
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="login">
        <div className="Placeholder-bg">
          <span></span>
        </div>
        <section className="Placeholder-tagline">
          <i className="Placeholder-logo">
            <SVGFaviconColor />
          </i>
          <h1 className="Placeholder-text">
            Barter <strong>DEX</strong>
          </h1>
          <section className="form">
            <div className="login-newpassphrase">
              <button
                onClick={ this.generateNewSeed }
                className="Clipboard action lefttext normaltext dark">
                <span>{ translate('DEX.GEN_NEW_PASSPHRASE') }</span>
                <i className="Clipboard-icon">
                  <SVGCopy />
                </i>
              </button>
            </div>
            <textarea
              name="passphrase"
              onChange={ this.updateInput }
              placeholder="Enter here your passphrase"
              value={ this.state.passphrase }
              style={{ fontSize: '18px', minWidth: '260px' }}></textarea>
            { !this.state.isNewPassphrase &&
              <button
                onClick={ this.startMM }
                disabled={ !this.state.passphrase }
                className="login-button withBorder action centered primary">
                <span>{ translate('DEX.LOGIN') }</span>
                <i>
                  <SVGChevronRight />
                </i>
              </button>
            }
            { this.state.isNewPassphrase &&
              <button
                onClick={ this.startMM }
                className="action align-left danger login-passphrase-notice">
                <span>
                  <strong>
                    { translate('DEX.BACKUP_PASSPHRASE_P1') }, <br /><u>{ translate('DEX.BACKUP_PASSPHRASE_P2') }</u>
                  </strong>
                </span>
                <i>
                  <SVGCheck />
                </i>
              </button>
            }
          </section>
          <footer><small>version 1.3.5</small></footer>
        </section>
      </div>
    );
  }
}

export default DexLogin;