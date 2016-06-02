import chai, { expect } from 'chai';
import shallowDeepEqual from 'chai-shallow-deep-equal';
import compare from '../../src/reducers/compare';
import { REQUEST_COMPARISON, RECIEVE_COMPARISON } from '../../src/actions/compare';

chai.use(shallowDeepEqual);

describe('reducers', () => {
  describe('compare', () => {
    it('handles initial state', () => {
      expect(compare(undefined, {})).to.deep.equal({
        cachedComparisons: {},
        isFetching: false,
      });
    });

    it('handles REQUEST_COMPARISON', () => {
      expect(compare(null, { type: REQUEST_COMPARISON }))
        .to.deep.equal({ isFetching: true, fetchedComparison: null });
    });

    describe('RECIEVE_COMPARISON', () => {
      const originalComparison = { 'sean-trevonte': null };
      const newComparison = {
        'sean-shaky': {
          player1: 'sean',
          player2: 'shaky',
          matches: [],
          winPercentage: 0.04,
        },
      };
      const data = {
        player1: 'sean',
        player2: 'shaky',
        matches: [],
        'win-percentage': 0.04,
      };

      it('merges the comparison into the cache', () => {
        const mergedComparisons = Object.assign({}, originalComparison, newComparison);
        const state = compare(
          { cachedComparisons: originalComparison },
          { type: RECIEVE_COMPARISON, data },
        );
        expect(state.cachedComparisons).to.shallowDeepEqual(mergedComparisons);
      });

      it('has a copy of fetchedComparison in cachedComparisons', () => {
        const state = compare(
          { cachedComparisons: originalComparison },
          { type: RECIEVE_COMPARISON, data },
        );
        expect(state.fetchedComparison).to.deep.equal(
          state.cachedComparisons['sean-shaky'],
        );
      });

      it('includes a timestamp in the comparisons', () => {
        const state = compare(
          { cachedComparisons: originalComparison },
          { type: RECIEVE_COMPARISON, data },
        );
        expect(state.fetchedComparison).to.include.keys('updatedAt');
      });
    });
  });
});
