import { expect } from 'chai';
import { stub, spy, useFakeTimers } from 'sinon';
import { submitCompare, REQUEST_COMPARISON, RECIEVE_COMPARISON } from '../../src/actions/compare';

function mockFetch(data) {
  return stub().returns(Promise.resolve({json: () => data}));
}

describe('submitCompare', () => {
  it('immediately dispatches a request comparison', () => {
    const fetch = mockFetch();
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2';

    submitCompare(p1, p2, fetch)(dispatch);

    expect(dispatch).to.have.been.calledWith({ type: REQUEST_COMPARISON });
  });


  it('fetches from the api', () => {
    const fetch = mockFetch();
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2';

    submitCompare(p1, p2, fetch)(dispatch);

    expect(fetch).to.have.been.calledWith(
      'http://localhost:3001/compare?player1=p1&player2=p2');
  });

  it('dispatches RECIEVE_COMPARISON on success', () => {
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2';
    const data = {player1: {name: p1}, player2: {name: p2}};
    const fetch = mockFetch(data);

    return submitCompare(p1, p2, fetch)(dispatch).then(() => {
      expect(dispatch).to.have.been.calledWith(
        { type: RECIEVE_COMPARISON, data });
    });
  });
});
