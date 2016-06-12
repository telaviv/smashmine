import {
  REQUEST_PLAYER_INFO,
  RECIEVE_PLAYER_INFO,
  PLAYER_INFO_REQUEST_FAILED } from '../actions/player';

export default function player(state = { isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_PLAYER_INFO:
      return { isFetching: true };
    case RECIEVE_PLAYER_INFO:
      return { isFetching: false, ...action.data };
    case PLAYER_INFO_REQUEST_FAILED:
      return { isFetching: false };
    default:
      return state;
  }
}
