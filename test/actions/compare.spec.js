import { expect } from 'chai';
import { stub, spy, useFakeTimers } from 'sinon';
import { submitCompare, REQUEST_COMPARISON, RECIEVE_COMPARISON } from '../../src/actions/compare';

class MockFetch {
  constructor(payload) {
    this._resolver = spy();
    this._promise = new Promise(this._resolver);
    this._fetch = stub().returns(this._promise);
  }

  resolve(payload) {
    this._resolve({json: () => payload});
  }

  get fetch() {
    return this._fetch;
  }

  get _resolve() {
    return this._resolver.args[0][0];
  }
}

describe('submitCompare', () => {
  it('immediately dispatches a request comparison', () => {
    const fetch = new MockFetch();
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2';

    submitCompare(p1, p2, fetch.fetch)(dispatch);

    expect(dispatch).to.have.been.calledWith({ type: REQUEST_COMPARISON });
  });


  it('fetches from the api', () => {
    const fetch = new MockFetch();
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2';

    submitCompare(p1, p2, fetch.fetch)(dispatch);

    expect(fetch.fetch).to.have.been.calledWith(
      'http://localhost:3001/compare?player1=p1&player2=p2');
  });

  it('dispatches RECIEVE_COMPARISON on success', (done) => {
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2';
    const data = {player1: {name: p1}, player2: {name: p2}};

    fetch = stub().returns(Promise.resolve({json: () => data}));

    return submitCompare(p1, p2, fetch)(dispatch).then(() => {
      expect(dispatch).to.have.been.calledWith(
        { type: RECIEVE_COMPARISON, data });
      done();
    }).catch(done);
  });
});
