import React, { Component, PropTypes } from 'react';

export default class PlayerMatch extends Component {

  static propTypes = {
    opponent: PropTypes.string.isRequired,
    won: PropTypes.bool.isRequired,
    winPercentage: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    startRating: PropTypes.object.isRequired,
    endRating: PropTypes.object.isRequired,
    opponentRating: PropTypes.object.isRequired,
    score: PropTypes.string.isRequired,
  }

  render() {
    const { opponent } = this.props;
    return (
      <p>{opponent}</p>
    );
  }
}
