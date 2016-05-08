import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';


class CompareForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
  }

  render() {
    const { fields: { player1, player2 } } = this.props;
    return (
      <form name="compare">
        <input className="player1" type="text" placeholder="Shaky" {...player1} />
        <input className="player2" type="text" placeholder="Trevonte" {...player2} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'compare',
  fields: ['player-1', 'player-2'],
})(CompareForm);
