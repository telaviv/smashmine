import { expect } from 'chai';
import compare from '../../src/reducers/compare';
import { REQUEST_COMPARISON, RECIEVE_COMPARISON } from '../../src/actions/compare';


describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(compare(undefined, {})).to.deep.equal({cachedComparisons: {}});
    });

    it('should handle REQUEST_COMPARISON', () => {
      expect(compare(null, { type: REQUEST_COMPARISON}))
        .to.deep.equal({isFetching: true, fetchedComparison: null});
    });

    describe('RECIEVE_COMPARISON', () => {
      const originalComparison = {'sean-trevonte': null};
      const newComparison = {
        'sean-shaky': {
          player1: 'sean',
          player2: 'shaky',
          matches: [],
          winPercentage: 0.04,
        }
      };
      const data = {
        player1: 'sean',
        player2: 'shaky',
        matches: [],
        'win-percentage': 0.04,
      };

      it('should merge the comparison into the cache', () => {
        const mergedComparisons = Object.assign({}, originalComparison, newComparison);
        const state = compare(
          {cachedComparisons: originalComparison},
          {type: RECIEVE_COMPARISON, data},
        );
        expect(state.cachedComparisons).to.deep.equal(mergedComparisons);
      })
    });
  });
});
