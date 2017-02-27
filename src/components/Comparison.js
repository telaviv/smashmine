import React, { Component } from 'react';
import { sprintf } from 'sprintf-js';
import PlayerStats from './PlayerStats';
import Matches from './Matches';
import apiPropTypes from 'utils/proptypes';

export default class Comparison extends Component {

  static propTypes = {
    comparison: apiPropTypes.comparison.isRequired,
  }

  setRecord() {
    const { player1: { name: p1name },
            player2: { name: p2name },
            matches } = this.props.comparison;
    let p1wins = 0;
    let p2wins = 0;
    matches.forEach((match) => {
      if (p1name === match.winner) {
        p1wins += 1;
      } else if (p2name === match.winner) {
        p2wins += 1;
      }
    });
    return sprintf('%i-%i', p1wins, p2wins);
  }

  winPercentage() {
    const { winPercentage } = this.props.comparison;
    return sprintf('%.1f%%', winPercentage * 100);
  }

  render() {
    const { player1, player2, matches } = this.props.comparison;
    return (
      <div>
        <PlayerStats {...player1} />
        <PlayerStats {...player2} />
        <p>{player1.name} has a {this.winPercentage()} chance of beating {player2.name}</p>
        <p>Set Record: {this.setRecord()}</p>
        <Matches matches={matches} />
      </div>
    );
  }
}
