import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { If, Then } from 'react-if';

function PlayerField(player) {
  return (
    <div>
      <input type="text" { ...player } />
      <If condition={player.touched && player.error} >
        <Then><span className="error">{player.error}</span></Then>
      </If>
    </div>
  );
}

export class CompareForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitCompare: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  submit(data) {
    const { submitCompare } = this.props;
    const { player1, player2 } = data;
    return submitCompare(player1, player2);
  }

  render() {
    const { handleSubmit, error } = this.props;
    return (
      <form name="compare" onSubmit={handleSubmit(this.submit.bind(this))} >
        <Field name="player1" placeholder="Shaky" component={PlayerField} />
        <Field name="player2" placeholder="Trevonte" component={PlayerField} />
        <If condition={!!error}>
          <Then><span className="error">{error}</span></Then>
        </If>
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
