import { REQUEST_COMPARISON } from '../actions/compare';

export default function compare(state = null, action) {
  switch (action.type) {
    case REQUEST_COMPARISON:
      return { isFetching: true }
    default:
      return state;
  }
}
