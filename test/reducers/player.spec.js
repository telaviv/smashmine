import { expect } from 'chai';
import player from '../../src/reducers/player';
import { REQUEST_PLAYER_INFO } from '../../src/actions/player';

describe('reducers', () => {
  describe('player', () => {
    it('handles initial state', () => {
      expect(player(undefined, {})).to.deep.equal({ isFetching: false });
    });
    it('handles REQUEST_PLAYER_INFO', () => {
      expect(player(undefined, { type: REQUEST_PLAYER_INFO })).to.deep.equal(
        { isFetching: true },
      );
    });
  });
});
