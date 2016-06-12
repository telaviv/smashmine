import React, { Component, PropTypes } from 'react';
import PlayerMatch from './PlayerMatch';

export default class PlayerInfo extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
  }

  render() {
    const { player: { name, rating, stddev }, matches } = this.props;
    return (
      <div>
        <div>
          <h1>{name}</h1>
          <div>
            <p>rating: {rating}</p>
            <p>stddev: {stddev}</p>
          </div>
        </div>
        <div>
          {matches.map(match => (
             <div key={match.id}><PlayerMatch {...match} /></div>
           ))}
        </div>
      </div>
    );
  }
}
