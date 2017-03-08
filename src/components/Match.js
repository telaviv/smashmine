import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import PlayerLink from './PlayerLink';
import TournamentLink from './TournamentLink';
import apiPropTypes from 'utils/proptypes';

export default class Match extends Component {

  static propTypes = {
    hide: PropTypes.arrayOf(PropTypes.string).isRequired,
    match: apiPropTypes.match.isRequired,
  }

  render() {
    const { hide, match: { winner, loser, score, tournament, time } } = this.props;
    let tournamentRow;
    if (hide.includes('tournament') || hide.includes('time')) {
      tournamentRow = null;
    } else {
      tournamentRow = (
        <div className="match__row small">
          <TournamentLink {...tournament} />
          {moment(time).fromNow()}
        </div>
      );
    }
    return (
      <div className="match">
        { tournamentRow }
        <div className="match__row">
          <p><PlayerLink name={winner} /> &gt; <PlayerLink name={loser} /></p>
          <p>{score}</p>
        </div>
      </div>
    );
  }
}
