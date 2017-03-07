import React, { Component, PropTypes } from 'react';
import PlayerMatch from './PlayerMatch';
import PlayerStats from './PlayerStats';
import apiPropTypes from 'utils/proptypes';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';

export default class PlayerInfo extends Component {

  static propTypes = {
    player: apiPropTypes.player.isRequired,
    matches: PropTypes.arrayOf(apiPropTypes.playerMatch).isRequired,
  }

  render() {
    const { player, matches } = this.props;
    const matchNodes = matches.map(match => (
      <PlayerMatch match={match} key={match.id} />
    ));
    return (
      <div className="PlayerInfo">
        <NavBar />
        <PageContent>
          <div className="PlayerInfo__meta"><PlayerStats {...player} /></div>
          <div>
            {matchNodes}
          </div>
        </PageContent>
      </div>
    );
  }
}
