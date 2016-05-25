import { expect } from 'chai';
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { CompareForm } from '../../src/components/CompareForm';

function setup() {
  const props = {
    fields: { player1: { value: 'p1' },
              player2: { value: 'p2' } },
    submitCompare: spy(),
  };

  const component = mount(<CompareForm {...props} />);

  return {
    component,
    props,
    form: component.find('form'),
  };
}

describe('CompareForm component', () => {
  it('submits a comparison on submit', () => {
    const { props: { fields, submitCompare }, form } = setup();
    form.at(0).simulate('submit');
    expect(submitCompare).to.be.calledWith(
      fields.player1.value, fields.player2.value,
    );
  });
});
