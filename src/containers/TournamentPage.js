import React, { Component, PropTypes } from 'react';
import { fetchTournamentInfo } from '../actions/tournament';
import { connect } from 'react-redux';

class TournamentPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    tournamentInfo: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchTournamentInfo(id));
  }

  render() {
    const { showLoader, tournamentInfo } = this.props;
    let component;
    if (showLoader) {
      component = <p>Loading ... </p>;
    } else {
      component = <h1>{tournamentInfo.tournament.title}</h1>;
    }
    return (
      <div>
        {component}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { tournament, matches } = state.tournament;
  return {
    id: ownProps.params.id,
    showLoader: !tournament,
    tournamentInfo: { tournament, matches },
  };
}

export default connect(mapStateToProps)(TournamentPage);
