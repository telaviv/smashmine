import React, { Component, PropTypes } from 'react';

export default class PlayerInfo extends Component {

  static propTypes = {
    player: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
    tournament: PropTypes.object.isRequired,
  }

  render() {
    const { tournament: { title } } = this.props;
    return (
      <div>
        <div>
          <h1>{title}</h1>
        </div>
      </div>
    );
  }
}
