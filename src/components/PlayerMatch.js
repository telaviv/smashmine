import React, { Component } from 'react';
import moment from 'moment';

import PlayerLink from './PlayerLink';
import TournamentLink from './TournamentLink';
import { sprintf } from 'sprintf-js';
import apiPropTypes from 'utils/proptypes';

export default class PlayerMatch extends Component {

  static propTypes = {
    match: apiPropTypes.playerMatch.isRequired,
  }

  ratingDiff() {
    const { startRating, endRating, won } = this.props.match;
    const diff = endRating.rating - startRating.rating;
    const winMessage = won ? 'Win' : 'Loss';
    return sprintf(' %s — %.1f', winMessage, diff);
  }

  render() {
    const { opponent, tournament, time } = this.props.match;
    return (
      <div className="match">
        <div className="match__row small">
          <TournamentLink {...tournament} />
          <p>{moment(time).fromNow()}</p>
        </div>
        <div className="match__row">
          <p><PlayerLink name={opponent} /></p>
          <p className="match__rating-diff">{this.ratingDiff()}</p>
        </div>
      </div>
    );
  }
}
