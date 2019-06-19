import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { router } from '../redux';
import Header from '../components/Header';

class HeaderContainer extends Component {
  push = href => {
    const { pushAction } = this.props;
    pushAction(href);
  };

  render() {
    return <Header pushFn={this.push} />;
  }
}

HeaderContainer.propTypes = {
  pushAction: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  pushAction: router.actions.push
};

export default connect(
  null,
  mapDispatchToProps
)(HeaderContainer);
