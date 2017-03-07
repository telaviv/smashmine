import React, { Component, PropTypes } from 'react';
import PlayerMatch from './PlayerMatch';
import apiPropTypes from 'utils/proptypes';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';

export default class PlayerInfo extends Component {

  static propTypes = {
    player: apiPropTypes.player.isRequired,
    matches: PropTypes.arrayOf(apiPropTypes.playerMatch).isRequired,
  }

  render() {
    const { player: { name, rating, stddev }, matches } = this.props;
    const matchNodes = matches.map(match => (
      <PlayerMatch match={match} key={match.id} />
    ));
    return (
      <div>
        <NavBar />
        <PageContent>
          <div>
            <h1>{name}</h1>
            <div>
              <p>rating: {rating}</p>
              <p>stddev: {stddev}</p>
            </div>
          </div>
          <div>
            {matchNodes}
          </div>
        </PageContent>
      </div>
    );
  }
}
