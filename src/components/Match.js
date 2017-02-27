import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import PlayerLink from './PlayerLink';
import TournamentLink from './TournamentLink';

export default class Match extends Component {

  static propTypes = {
    winner: PropTypes.string.isRequired,
    loser: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    tournament: PropTypes.object,
    time: PropTypes.number.isRequired,
    hide: PropTypes.array,
  }

  render() {
    const { winner, loser, score, tournament, time, hide } = this.props;
    return (
      <tr className="match">
        <td><PlayerLink name={winner} /> &gt; <PlayerLink name={loser} /></td>
        <td>{score}</td>
        {hide.includes('tournament') ? null :
          <td><TournamentLink {...tournament} /></td>}
        {hide.includes('time') ? null :
         <td>{moment(time).fromNow()}</td>}
      </tr>
    );
  }
}


Match.defaultProps = { hide: [] };
