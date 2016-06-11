import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { SubmissionError } from 'redux-form';
import { fetchPlayerInfo,
         REQUEST_PLAYER_INFO,
         PLAYER_INFO_REQUEST_FAILED } from '../../src/actions/player';

function mockFetch(data) {
  return stub().returns(Promise.resolve(data));
}

function mockFetchError() {
  const error = new SubmissionError({ _error: 'nope' });
  return stub().returns(Promise.reject(error));
}

describe('actions', () => {
  describe('compare', () => {
    describe('fetchPlayerInfo', () => {
      const player = 'p1';

      it('immediately dispatches a REQUEST_PLAYER_INFO', () => {
        const fetch = mockFetch();
        const dispatch = spy();

        fetchPlayerInfo(player, fetch)(dispatch);

        expect(dispatch).to.have.been.calledWith({ type: REQUEST_PLAYER_INFO });
      });

      it('dispatches a PLAYER_INFO_REQUEST_FAILED on failure', () => {
        const fetch = mockFetchError();
        const dispatch = spy();

        return fetchPlayerInfo(player, fetch)(dispatch).catch(() => {
          expect(dispatch).to.have.been.calledWith(
            { type: PLAYER_INFO_REQUEST_FAILED }
          );
        });
      });
    });
  });
});
