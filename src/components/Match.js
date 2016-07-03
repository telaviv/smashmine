import React, { Component, PropTypes } from 'react';
import moment from 'moment';
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
        <td>{winner} > {loser}</td>
        <td>{score}</td>
        <td><TournamentLink {...tournament} /></td>
        <td>{moment(time).fromNow()}</td>
      </tr>
    );
  }
}
