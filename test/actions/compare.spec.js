import { expect } from 'chai';
import { match, stub, spy, useFakeTimers } from 'sinon';
import { submitCompare, REQUEST_COMPARISON, RECIEVE_COMPARISON } from '../../src/actions/compare';

function mockFetch(data, status=200) {
  return stub().returns(Promise.resolve(response(data, status)));
}

function response(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {'Content-type': 'application/json'},
  });
}

describe('submitCompare', () => {
  const p1 = 'p1';
  const p2 = 'p2';

  it('immediately dispatches a request comparison', () => {
    const fetch = mockFetch();
    const dispatch = spy();

    submitCompare(p1, p2, fetch)(dispatch);

    expect(dispatch).to.have.been.calledWith({ type: REQUEST_COMPARISON });
  });


  it('fetches from the api', () => {
    const fetch = mockFetch();
    const dispatch = spy();

    submitCompare(p1, p2, fetch)(dispatch);

    expect(fetch).to.have.been.calledWith(
      'http://localhost:3001/compare?player1=p1&player2=p2');
  });

  it('dispatches RECIEVE_COMPARISON on success', () => {
    const dispatch = spy();
    const data = {player1: {name: p1}, player2: {name: p2}};
    const fetch = mockFetch(data);

    return submitCompare(p1, p2, fetch)(dispatch).then(() => {
      expect(dispatch).to.have.been.calledWith(
        { type: RECIEVE_COMPARISON, data });
    });
  });

  it('pushes to canonical urls.', () => {
    const dispatch = spy();
    const data = {player1: {name: p1}, player2: {name: p2}};
    const fetch = mockFetch(data);

    return submitCompare(p1, p2, fetch)(dispatch).then(() => {
      expect(dispatch).to.have.been.calledWith(
        {type: match.any,
         payload: {method: 'push', args: ['/compare/p1/p2']}});
    });
  });
});
