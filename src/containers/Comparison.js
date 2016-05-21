import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { If, Then } from 'react-if';
import { sprintf } from 'sprintf-js';
import * as CompareActions from '../actions/compare';

class Comparison extends Component {

  setRecord() {
    const { player1: { name: p1name },
            player2: { name: p2name },
            matches: matches } = this.props;
    let p1wins = 0;
    let p2wins = 0;
    matches.map( match => {
      if (p1name === match.winner) {
        p1wins++;
      } else if (p2name === match.winner) {
        p2wins++;
      }
    });
    return p1wins + ' - ' + p2wins;
  }

  winPercentage() {
    const { winPercentage } = this.props;
    return sprintf('%.1f%%', winPercentage * 100);
  }

  render() {
    const { player1, player2, matches } = this.props;
    return (
      <div>
      <p>{player1.name} has a {this.winPercentage()} chance of beating {player2.name}</p>
      <p>Set Record: {this.setRecord()}</p>
      <table>
        {matches.map( match => {
          return (
            <tr>
              <td>{match.winner} > {match.loser}</td>
              <td>{match.score}</td>
              <td>{match.tournament}</td>
              <td>{match.date}</td>
            </tr>
          )
        })}
      </table>
      </div>
    )
  }
}

class ComparisonLoader extends Component {

  componentWillMount() {
    const {p1name, p2name, dispatch, fetchData} = this.props;
    if (fetchData) {
      dispatch(CompareActions.submitCompare(p1name, p2name));
    }
  }

  render() {
    const {loadingData, comparison} = this.props;
    if (loadingData) {
        return <p>Loading ...</p>
    } else {
      return (
        <Comparison {...comparison} />
      );
    }
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
  }
}

export default connect(mapStateToProps)(ComparisonLoader);
