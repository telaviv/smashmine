import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux'

export const REQUEST_COMPARISON = 'REQUEST_COMPARISON';
export const RECIEVE_COMPARISON = 'RECIEVE_COMPARISON';

function requestComparison() {
  return { type: REQUEST_COMPARISON };
}

function receiveComparison(data) {
  return {
    type: RECIEVE_COMPARISON,
    data,
  };
}

function generateCompareRedirect(player1, player2) {
  let path = '/compare';
  path += '?player1=' + encodeURIComponent(player1);
  path += '&player2=' + encodeURIComponent(player2);
  return path;
}

export function submitCompare(player1, player2) {
  return (dispatch) => {
    dispatch(requestComparison());

    const host = 'http://localhost:3001/compare';
    const url = host + '?player1=' + player1 + '&player2=' + player2;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveComparison(json));
        dispatch(push(generateCompareRedirect(player1, player2)));
      });
  };
}
