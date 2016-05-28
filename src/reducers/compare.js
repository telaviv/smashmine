import { REQUEST_COMPARISON, RECIEVE_COMPARISON } from '../actions/compare';
import { sprintf } from 'sprintf-js';

function createComparison(data) {
  return {
    player1: data.player1,
    player2: data.player2,
    matches: data.matches,
    winPercentage: data['win-percentage'],
    updatedAt: Date.now(),
  };
}

function mergeComparisonCache(state, data, comparison) {
  const { cachedComparisons } = state;
  const { player1, player2 } = data;
  return Object.assign(
    {},
    cachedComparisons,
    { [sprintf('%s-%s', player1, player2)]: comparison }
  );
}

export default function compare(state = { cachedComparisons: {} }, action) {
  switch (action.type) {
    case REQUEST_COMPARISON:
      return Object.assign({}, state, { isFetching: true, fetchedComparison: null });
    case RECIEVE_COMPARISON: {
      const comp = createComparison(action.data);
      return {
        isFetching: false,
        fetchedComparison: comp,
        cachedComparisons: mergeComparisonCache(state, action.data, comp),
      };
    }
    default:
      return state;
  }
}
