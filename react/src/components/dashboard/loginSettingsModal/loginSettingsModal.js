import React from 'react';
import { connect } from 'react-redux';
import translate from '../../../translate/translate';
import { toggleLoginSettingsModal } from '../../../actions/actionCreators';
import Store from '../../../store';

import { LoginSettingsModalRender } from './loginSettingsModal.render';

class LoginSettingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.closeLoginSettingsModal = this.closeLoginSettingsModal.bind(this);
  }

  closeLoginSettingsModal() {
    Store.dispatch(toggleLoginSettingsModal(false));
  }

  render() {
    if (this.props &&
        this.props.Main &&
        this.props.Main.displayLoginSettingsModal) {
      return LoginSettingsModalRender.call(this);
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    Main: state.Main,
  };
};

export default connect(mapStateToProps)(LoginSettingsModal);
