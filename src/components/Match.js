import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Match extends Component {

  static propTypes = {
    winner: PropTypes.string.isRequired,
    loser: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    tournament: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }

  render() {
    const { winner, loser, score, tournament, time, id } = this.props;
    return (
      <tr key={id}>
        <td>{winner} > {loser}</td>
        <td>{score}</td>
        <td>{tournament}</td>
        <td>{moment(time).fromNow()}</td>
      </tr>
    );
  }
}
