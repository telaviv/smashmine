import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { fetchPlayerInfo,
         REQUEST_PLAYER_INFO } from '../../src/actions/player';

function mockFetch(data) {
  return stub().returns(Promise.resolve(data));
}

describe('actions', () => {
  describe('compare', () => {
    describe('fetchPlayerInfo', () => {
      const player = 'p1';

      it('immediately dispatches a request comparison', () => {
        const fetch = mockFetch();
        const dispatch = spy();

        fetchPlayerInfo(player, fetch)(dispatch);

        expect(dispatch).to.have.been.calledWith({ type: REQUEST_PLAYER_INFO });
      });
    });
  });
});
