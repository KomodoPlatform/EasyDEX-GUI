import React from 'react';
import translate from '../../../translate/translate';
import { importPrivKey } from '../../../actions/actionCreators';
import Store from '../../../store';

class ImportKeysPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      importWifKey: '',
    };
    this.importWifKey = this.importWifKey.bind(this);
  }

  importWifKey() {
    Store.dispatch(importPrivKey(this.state.importWifKey));
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <p>{ translate('INDEX.IMPORT_KEYS_DESC_P1') }</p>
            <p>{ translate('INDEX.IMPORT_KEYS_DESC_P2') }</p>
            <p>{ translate('INDEX.IMPORT_KEYS_DESC_P3') }</p>
            <p>
              <strong>
                <i>{ translate('INDEX.PLEASE_KEEP_KEYS_SAFE') }</i>
              </strong>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="wifkeys-import-form">
              <div className="form-group form-material floating">
                <input
                  type="text"
                  className="form-control"
                  name="importWifKey"
                  id="importWifkey"
                  onChange={ this.updateInput } />
                <label
                  className="floating-label"
                  htmlFor="importWifkey">{ translate('INDEX.INPUT_PRIV_KEY') }</label>
              </div>
              <div className="col-sm-12 col-xs-12 text-align-center">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  onClick={ this.importWifKey }>{ translate('INDEX.IMPORT_PRIV_KEY') }</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImportKeysPanel;