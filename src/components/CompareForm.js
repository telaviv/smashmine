import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';


export class CompareForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitCompare: PropTypes.func.isRequired,
  }

  submit(data) {
    const { submitCompare } = this.props;
    const { player1, player2 } = data;
    return submitCompare(player1, player2);
  }

  playerField(placeholder) {
    return (player) => (
      <div>
        <input type="text" { ...{ placeholder, ...player } } />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form name="compare" onSubmit={handleSubmit(this.submit.bind(this))} >
        <Field name="player1" component={this.playerField('Shaky')} />
        <Field name="player2" component={this.playerField('Trevonte')} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function isEmpty(value) {
  return value === undefined || value === null || value === '';
}

function validate(values) {
  const errors = {};
  if (isEmpty(values.player1)) {
    errors.player1 = 'Required';
  }
  if (isEmpty(values.player2)) {
    errors.player2 = 'Required';
  }
  return errors;
}

export default reduxForm({
  form: 'compare',
  validate,
})(CompareForm);
