import React, { Component, PropTypes } from 'react';

export default class PlayerInfo extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
  }

  render() {
    const { player: { name } } = this.props;
    return (
      <h1>{name}</h1>
    );
  }
}
