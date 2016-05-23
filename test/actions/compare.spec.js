import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { submitCompare, REQUEST_COMPARISON } from '../../src/actions/compare';

class MockFetch {
  constructor(payload) {
    this._payload = payload;
    this._resolver = spy();
    this._fetch = stub().returns(new Promise(this._resolver));
  }

  get fetch() {
    return this._fetch;
  }
}

describe('submitCompare', () => {
  it('immediately dispatches a request comparison', () => {
    const fetch = new MockFetch()
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2';

    submitCompare(p1, p2, fetch.fetch)(dispatch);

    expect(dispatch).to.have.been.calledWith({ type: REQUEST_COMPARISON });
  });

  it('fetches from the api', () => {
    const fetch = new MockFetch()
    const dispatch = spy();
    const p1 = 'p1';
    const p2 = 'p2';

    submitCompare(p1, p2, fetch.fetch)(dispatch);

    expect(fetch.fetch).to.have.been.calledWith(
      'http://localhost:3001/compare?player1=p1&player2=p2');
  });
});
