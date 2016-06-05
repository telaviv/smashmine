import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class PlayerPage extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render() {
    const { name } = this.props;
    return (
      <h1>{name}</h1>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { name: ownProps.params.player };
}

export default connect(mapStateToProps)(PlayerPage);
