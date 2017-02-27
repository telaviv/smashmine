import React, { Component } from 'react';
import apiPropTypes from 'utils/proptypes';

export default class PlayerInfo extends Component {

  static propTypes = {
    tournament: apiPropTypes.tournament.isRequired,
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
