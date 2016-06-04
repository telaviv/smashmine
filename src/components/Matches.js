import React, { Component, PropTypes } from 'react';
import Match from './Match';

export default class Matches extends Component {

  static propTypes = {
    matches: PropTypes.array.isRequired,
  }

  render() {
    const { matches } = this.props;
    return (
      <table>
        <tbody>
          {matches.map(match => (
             <Match key={match.id} {...match} />
           ))}
        </tbody>
      </table>
    );
  }
}
