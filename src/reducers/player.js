import { REQUEST_PLAYER_INFO, RECIEVE_PLAYER_INFO } from '../actions/player';
import { normalizeKeys } from '../utils/api';

export default function player(state = { isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_PLAYER_INFO:
      return { isFetching: true };
    case RECIEVE_PLAYER_INFO: {
      return {
        isFetching: false,
        player: action.data.player,
        matches: action.data.matches.map(normalizeKeys),
      };
    }
    default:
      return state;
  }
}
