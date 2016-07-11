import React, { Component, PropTypes } from 'react';
import { fetchTournamentInfo } from '../actions/tournament';
import { connect } from 'react-redux';

class TournamentPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchTournamentInfo(id));
  }

  render() {
    const { id } = this.props;
    return (
      <h1>{id}</h1>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
  };
}

export default connect(mapStateToProps)(TournamentPage);
