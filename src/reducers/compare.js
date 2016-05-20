import { REQUEST_COMPARISON, RECIEVE_COMPARISON } from '../actions/compare';

function mergeComparisonCache(state, data) {
  const { cachedComparisons } = state;
  const { player1, player2 } = data;
  return Object.assign(
    {},
    cachedComparisons,
    {[player1 + '-' + player2]: createComparison(data)}
  );
}


function createComparison(data) {
  return  {
    player1: data.player1,
    player2: data.player2,
    matches: data.matches,
    winPercentage: data['win-percentage'],
    updatedAt: Date.now(),
  };
}

export default function compare(state = {cachedComparisons: {}}, action) {
  switch (action.type) {
    case REQUEST_COMPARISON:
      return Object.assign({}, state, {isFetching: true, fetchedComparison: null});
    case RECIEVE_COMPARISON:
      return {
        isFetching: false,
        fetchedComparison: createComparison(action.data),
        cachedComparisons: mergeComparisonCache(state, action.data),
      };
    default:
      return state;
  }
}
