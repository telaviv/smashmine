import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPlayerInfo } from '../actions/player';
import PlayerInfo from '../components/PlayerInfo';
import apiPropTypes from 'utils/proptypes';

class PlayerPage extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    playerInfo: PropTypes.shape({
      player: apiPropTypes.player.isRequired,
      matches: PropTypes.arrayOf(apiPropTypes.match).isRequired,
    }),
  }

  componentWillMount() {
    const { dispatch, name } = this.props;
    dispatch(fetchPlayerInfo(name));
  }

  render() {
    const { showLoader, playerInfo } = this.props;
    let component;
    if (showLoader) {
      component = <p>Loading ... </p>;
    } else {
      component = <PlayerInfo {...playerInfo} />;
    }
    return (
      <div>
        {component}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { player, matches } = state.player;
  const showLoader = !(player && matches);
  return {
    name: ownProps.params.player,
    showLoader,
    playerInfo: showLoader ? undefined : { player, matches },
  };
}

export default connect(mapStateToProps)(PlayerPage);
