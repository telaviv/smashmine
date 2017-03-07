import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchTournamentInfo } from '../actions/tournament';
import Matches from '../components/Matches';
import apiPropTypes from 'utils/proptypes';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';

class TournamentPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    tournament: apiPropTypes.tournament,
    matches: PropTypes.arrayOf(apiPropTypes.match),
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
      <div className="TournamentPage">
        <NavBar />
        <PageContent>
          <h1>{tournament.title}</h1>
          <div className="TournamentPage__meta">
            <p>{moment(tournament.time).fromNow()}</p>
            <a href={tournament.url}>Bracket</a>
          </div>
          <Matches matches={matches} hide={['tournament', 'time']} />
        </PageContent>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { tournament, matches } = state.tournament;
  return {
    id: ownProps.params.id,
    showLoader: !tournament,
    tournament,
    matches,
  };
}

export default connect(mapStateToProps)(TournamentPage);
