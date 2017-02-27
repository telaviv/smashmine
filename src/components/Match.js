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
