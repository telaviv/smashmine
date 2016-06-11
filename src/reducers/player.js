import { REQUEST_PLAYER_INFO } from '../../src/actions/player';

export default function player(state = { isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_PLAYER_INFO:
      return { isFetching: true };
    default:
      return state;
  }
}
