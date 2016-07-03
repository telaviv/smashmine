import React, { Component, PropTypes } from 'react';
import PlayerLink from './PlayerLink';
import TournamentLink from './TournamentLink';
import { sprintf } from 'sprintf-js';

export default class PlayerMatch extends Component {

  static propTypes = {
    tournament: PropTypes.object.isRequired,
    opponent: PropTypes.string.isRequired,
    won: PropTypes.bool.isRequired,
    winPercentage: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    startRating: PropTypes.object.isRequired,
    endRating: PropTypes.object.isRequired,
    opponentRating: PropTypes.object.isRequired,
    score: PropTypes.string.isRequired,
  }

  winMessage() {
    const { won } = this.props;
    return won ? 'Win' : 'Loss';
  }

  ratingDiff() {
    const { startRating, endRating } = this.props;
    return endRating.rating - startRating.rating;
  }

  render() {
    const { opponent, tournament } = this.props;
    return (
      <tr>
        <td><PlayerLink name={opponent} /></td>
        <td><TournamentLink {...tournament} /></td>
        <td>{sprintf(' %s %.1f', this.winMessage(), this.ratingDiff())}</td>
      </tr>
    );
  }
}
