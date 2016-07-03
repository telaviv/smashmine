import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import PlayerLink from './PlayerLink';
import TournamentLink from './TournamentLink';

export default class Match extends Component {

  static propTypes = {
    winner: PropTypes.string.isRequired,
    loser: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    tournament: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired,
  }

  render() {
    const { winner, loser, score, tournament, time } = this.props;
    return (
      <tr>
        <td><PlayerLink name={winner} /> > <PlayerLink name={loser} /></td>
        <td>{score}</td>
        <td><TournamentLink {...tournament} /></td>
        <td>{moment(time).fromNow()}</td>
      </tr>
    );
  }
}
