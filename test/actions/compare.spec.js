import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { submitCompare, REQUEST_COMPARISON } from '../../src/actions/compare';

describe('submitCompare', () => {
  it('immediately dispatches a request comparison', () => {
    const fetch = stub().returns(new Promise(spy()));
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2'

    submitCompare(p1, p2, fetch)(dispatch);

    expect(dispatch).to.have.been.calledWith({ type: REQUEST_COMPARISON });
  });
});
