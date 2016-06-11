import { expect } from 'chai';
import player from '../../src/reducers/player';

describe('reducers', () => {
  describe('player', () => {
    it('handles initial state', () => {
      expect(player(undefined, {})).to.deep.equal({ isFetching: false });
    });
  });
});
