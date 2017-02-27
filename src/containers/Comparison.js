import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as CompareActions from '../actions/compare';
import Comparison from '../components/Comparison';
import apiPropTypes from 'utils/proptypes';

class ComparisonLoader extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    p1name: PropTypes.string.isRequired,
    p2name: PropTypes.string.isRequired,
    fetchData: PropTypes.bool.isRequired,
    loadingData: PropTypes.bool.isRequired,
    comparison: apiPropTypes.comparison,
  }

  componentWillMount() {
    const { p1name, p2name, dispatch, fetchData } = this.props;
    if (fetchData) {
      dispatch(CompareActions.submitCompare(p1name, p2name));
    }
  }

  render() {
    const { loadingData, comparison } = this.props;
    if (loadingData) {
      return <p>Loading ...</p>;
    }
    return <Comparison comparison={comparison} />;
  }
}

function mapStateToProps(state, ownProps) {
  const { isFetching, fetchedComparison } = state.compare;
  const { player1, player2 } = ownProps.params;
  return {
    fetchData: !fetchedComparison,
    loadingData: !fetchedComparison || isFetching,
    p1name: player1,
    p2name: player2,
    comparison: fetchedComparison,
  };
}


export default connect(mapStateToProps)(ComparisonLoader);
