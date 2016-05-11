import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
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

CompareForm = reduxForm({
  form: 'compare',
  fields: ['player1', 'player2'],
})(CompareForm);


export default connect()(CompareForm);
