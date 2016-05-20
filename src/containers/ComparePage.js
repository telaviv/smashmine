import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { If, Then } from 'react-if';
import { sprintf } from 'sprintf-js';
import * as CompareActions from '../actions/compare';


class CompareForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  submit(e) {
    e.preventDefault();
    const { fields: { player1, player2 }, dispatch } = this.props;
    const action = CompareActions.submitCompare(player1.value, player2.value);
    dispatch(action);
  }

  render() {
    const { fields: { player1, player2 } } = this.props;
    return (
      <form name="compare" onSubmit={this.submit.bind(this)} >
        <input className="player1" type="text" placeholder="Shaky" {...player1} />
        <input className="player2" type="text" placeholder="Trevonte" {...player2} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

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

CompareForm = reduxForm({
  form: 'compare',
  fields: ['player1', 'player2'],
})(CompareForm);


function mapStateToProps(state, ownProps) {
  const { player1, player2 } = ownProps.location.query;
  debugger;
  return {
    showComparison: Boolean(player1 && player2),
    compare: state.comparison[player1 + '-' + player2],
  };
}


class ComparePage extends Component {
  render() {
    const { showComparison, compare } = this.props;
    return (
      <div>
        <CompareForm />
        <If condition={ showComparison }>
          <Then>
            <Comparison {...compare}/>
          </Then>
        </If>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ComparePage);
