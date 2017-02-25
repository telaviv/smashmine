import React, { Component, PropTypes } from 'react';
import Match from './Match';

export default class Matches extends Component {

  static propTypes = {
    matches: PropTypes.array.isRequired,
    hide: PropTypes.array,
  }

  render() {
    const { matches, hide } = this.props;
    return (
      <table>
        <tbody>
          {matches.map(match => (
             <Match key={match.id} hide={hide} {...match} />
           ))}
        </tbody>
      </table>
    );
  }
}

Matches.defaultProps = { hide: [] };
