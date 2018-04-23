import React from 'react';
import translate from '../../../translate/translate';

const CoinTileRender = function() {
  return (
    <div className="page-aside padding-top-80">
      <div className="page-aside-switch">
        <i className="icon md-chevron-left"></i>
        <i className="icon md-chevron-right"></i>
      </div>
      <div className="page-aside-inner">
        <div className="wallet-widgets-list">
          <div>
            <div>
              <div className="list-group row wallet-widgets-row">
                { this.renderTiles() }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinTileRender;