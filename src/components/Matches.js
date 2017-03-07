import React, { Component, PropTypes } from 'react';
import Match from './Match';
import apiPropTypes from 'utils/proptypes';

export default class Matches extends Component {

  static propTypes = {
    matches: PropTypes.arrayOf(apiPropTypes.match).isRequired,
    hide: PropTypes.arrayOf(PropTypes.string),
  }

  render() {
    const { matches, hide } = this.props;
    return (
      <div className="matches">
        {matches.map(match => (
           <Match key={match.id} hide={hide} match={match} />
         ))}
      </div>
    );
  }
}

Matches.defaultProps = { hide: [] };
