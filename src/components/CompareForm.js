import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

function PlayerField(player) {
  return (
    <div>
      <input type="text" { ...{...player } } />
      {player.touched &&
       player.error &&
       <span className="error">{player.error}</span>}
    </div>
  );
}

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

  render() {
    const { handleSubmit } = this.props;
    return (
      <form name="compare" onSubmit={handleSubmit(this.submit.bind(this))} >
        <Field name="player1" placeholder="Shaky" component={PlayerField} />
        <Field name="player2" placeholder="Trevonte" component={PlayerField} />
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
