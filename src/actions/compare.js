/* eslint no-console: 0 */
import { fetch as apiFetch } from '../utils/api';
import { push } from 'react-router-redux';
import URI from 'urijs';
import 'urijs/src/URITemplate';

export const REQUEST_COMPARISON = 'REQUEST_COMPARISON';
export const RECIEVE_COMPARISON = 'RECIEVE_COMPARISON';
export const COMPARISON_FAILED = 'COMPARISON_FAILED';

function requestComparison() {
  return { type: REQUEST_COMPARISON };
}

function receiveComparison(data) {
  return {
    type: RECIEVE_COMPARISON,
    data,
  };
}

function compareRedirectURL(player1, player2) {
  const uri = URI.expand('/compare/{player1}/{player2}', { player1, player2 });
  return uri.toString();
}

export function submitCompare(player1, player2, fetch = apiFetch) {
  return (dispatch) => {
    dispatch(requestComparison());

    return fetch('compare', { player1, player2 })
      .then(json => {
        dispatch(receiveComparison(json));
        dispatch(push(compareRedirectURL(json.player1.name, json.player2.name)));
      })
      .catch(err => {
        dispatch({ type: COMPARISON_FAILED });
        throw err;
      });
  };
}
