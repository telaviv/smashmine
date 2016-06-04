import React, { Component, PropTypes } from 'react';
import { sprintf } from 'sprintf-js';
import moment from 'moment';
import PlayerStats from './PlayerStats';

export default class Comparison extends Component {

  static propTypes = {
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
    winPercentage: PropTypes.number.isRequired,
  }

  setRecord() {
    const { player1: { name: p1name },
            player2: { name: p2name },
            matches: matches } = this.props;
    let p1wins = 0;
    let p2wins = 0;
    matches.forEach(match => {
      if (p1name === match.winner) {
        p1wins++;
      } else if (p2name === match.winner) {
        p2wins++;
      }
    });
    return sprintf('%i-%i', p1wins, p2wins);
  }

  winPercentage() {
    const { winPercentage } = this.props;
    return sprintf('%.1f%%', winPercentage * 100);
  }

  render() {
    const { player1, player2, matches } = this.props;
    return (
      <div>
        <PlayerStats {...player1} />
        <PlayerStats {...player2} />
        <p>{player1.name} has a {this.winPercentage()} chance of beating {player2.name}</p>
        <p>Set Record: {this.setRecord()}</p>
        <table>
          <tbody>
            {matches.map(match => (
               <tr>
                 <td>{match.winner} > {match.loser}</td>
                 <td>{match.score}</td>
                 <td>{match.tournament}</td>
                 <td>{moment(match.time).fromNow()}</td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    );
  }
}
