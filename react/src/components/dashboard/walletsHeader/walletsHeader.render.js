import React from 'react';
import translate from '../../../translate/translate';

const WalletsHeaderRender = function() {
  return (
    <div
      className="page-header page-header-bordered header-easydex margin-bottom-0"
      id="easydex-header-div"
      style={{
        backgroundImage: `url("assets/images/bg/${this.props.activeSection}_transparent_header_bg.png")`
      }}>
      <ol className="breadcrumb">
        <li className={ this.isActiveSectionJumblr() ? 'hide' : 'header-easydex-section' }>
          { translate('INDEX.DASHBOARD') }
        </li>
        <li className={ !this.isActiveSectionJumblr() ? 'hide' : 'header-easydex-section' }>
          <img src="assets/images/native/jumblr_header_title_logo.png" /><br />
          { translate('SIDEBAR.JUMBLR_MOTTO') }
        </li>
      </ol>
    </div>
  );
};

export default WalletsHeaderRender;