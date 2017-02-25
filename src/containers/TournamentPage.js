import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTournamentInfo } from '../actions/tournament';
import Matches from '../components/Matches';

class TournamentPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    tournament: PropTypes.object,
    matches: PropTypes.array,
  }

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchTournamentInfo(id));
  }

  render() {
    const { showLoader, tournament, matches } = this.props;
    if (showLoader) {
      return <p>Loading ... </p>;
    }
    return (
      <div>
        <h1>{tournament.title}</h1>
        <Matches matches={matches} hide={['tournament', 'time']} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { tournament, matches } = state.tournament;
  return {
    id: ownProps.params.id,
    showLoader: !tournament,
    tournament: tournament,
    matches: matches,
  };
}

export default connect(mapStateToProps)(TournamentPage);
