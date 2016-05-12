import { REQUEST_COMPARISON, RECIEVE_COMPARISON } from '../actions/compare';

export default function compare(state = null, action) {
  switch (action.type) {
    case REQUEST_COMPARISON:
      return { isFetching: true };
    case RECIEVE_COMPARISON:
      return {
        isFetching: false,
        player1: action.data.players[0],
        player2: action.data.players[1],
        matches: action.data.matches,
      };
    default:
      return state;
  }
}
