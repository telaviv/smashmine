import {
  REQUEST_TOURNAMENT_INFO,
  RECIEVE_TOURNAMENT_INFO,
  TOURNAMENT_INFO_REQUEST_FAILED } from '../actions/tournament';

export default function tournament(state = { isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_TOURNAMENT_INFO:
      return { isFetching: true };
    case RECIEVE_TOURNAMENT_INFO:
      return { isFetching: false, ...action.data };
    case TOURNAMENT_INFO_REQUEST_FAILED:
      return { isFetching: false };
    default:
      return state;
  }
}
