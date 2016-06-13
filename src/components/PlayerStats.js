import React, { Component, PropTypes } from 'react';
import { sprintf } from 'sprintf-js';
import PlayerLink from './PlayerLink';

export default class PlayerStats extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    stddev: PropTypes.number.isRequired,
  }

  render() {
    const { name, rating, stddev } = this.props;
    return (
      <div>
        <p>
          <PlayerLink name={name} />
          <span> rating: {sprintf('{%.0f, %.0f}', rating, stddev)}</span>
        </p>
      </div>
    );
  }
}
