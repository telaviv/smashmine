import { expect } from 'chai';
import compare from '../../src/reducers/compare';
import { REQUEST_COMPARISON } from '../../src/actions/compare';


describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(compare(undefined, {})).to.equal(null);
    });

    it('should handle REQUEST_COMPARISON', () => {
      expect(compare(null, { type: REQUEST_COMPARISON }))
        .to.deep.equal({isFetching: true});
    });
  });
});
