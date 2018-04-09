import React from 'react';
import translate from '../../../translate/translate';

import ToolsGetBalance from './toolsGetBalance';
import ToolsGetUtxos from './toolsGetUtxos';
import ToolsOfflineSigCreate from './toolsOfflineSigCreate';
import ToolsOfflineSigScan from './toolsOfflineSigScan';
import ToolsSeedToWif from './toolsSeedToWif';
import ToolsWifToWif from './toolsWifToWif';
import ToolsPubCheck from './toolsPubCheck';
import ToolsStringToQr from './toolsStringToQr';
import ToolsMergeUTXO from './toolsMergeUtxo';
import ToolsSplitUTXO from './toolsSplitUtxo';

class Tools extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.setActiveSection = this.setActiveSection.bind(this);
  }

  setActiveSection(section) {
    this.setState({
      activeSection: section,
    });
  }

  /*renderButtons() {
    Offline signing scan
  }*/

  render() {
    return (
      <div className="page margin-left-0">
        <div className="page-content tools background--white">
          <div className="row">
            <div className="col-sm-12 no-padding-left">
              <h2>Tools</h2>
              <div className="margin-top-20 tools-btn-block">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('offlinesig-create') }>
                  Offline signing create
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('offlinesig-scan') }>
                  Offline signing scan
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('string2qr') }>
                  String to QR
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('seed2kp') }>
                  Seed to key pair
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('wif2wif') }>
                  WIF to WIF
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('pubcheck') }>
                  Address version check
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('balance') }>
                  Balance *
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('utxo') }>
                  UTXO *
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('utxo-split') }>
                  Split UTXO **
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={ () => this.setActiveSection('utxo-merge') }>
                  Merge UTXO **
                </button>
                <div className="margin-top-10 margin-left-20">* Electrum, ** Native</div>
              </div>
              <hr />
              { this.state.activeSection === 'offlinesig-create' &&
                <ToolsOfflineSigCreate />
              }
              { this.state.activeSection === 'offlinesig-scan' &&
                <ToolsOfflineSigScan />
              }
              { this.state.activeSection === 'string2qr' &&
                <ToolsStringToQr />
              }
              { this.state.activeSection === 'balance' &&
                <ToolsGetBalance />
              }
              { this.state.activeSection === 'utxo' &&
                <ToolsGetUtxos />
              }
              { this.state.activeSection === 'wif2wif' &&
                <ToolsWifToWif />
              }
              { this.state.activeSection === 'pubcheck' &&
                <ToolsPubCheck />
              }
              { this.state.activeSection === 'seed2kp' &&
                <ToolsSeedToWif />
              }
              { this.state.activeSection === 'utxo-split' &&
                <ToolsSplitUTXO />
              }
              { this.state.activeSection === 'utxo-merge' &&
                <ToolsMergeUTXO />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tools;