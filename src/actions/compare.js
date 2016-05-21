import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import URI from 'urijs';
import URITemplate from 'urijs/src/URITemplate';

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
  const uri = URI.expand('/compare/{player1}/{player2}', {player1, player2});
  return uri.toString();
}

export function submitCompare(player1, player2) {
  return (dispatch) => {
    dispatch(requestComparison());

    const host = 'http://localhost:3001/compare';
    const url = host + '?player1=' + encodeURIComponent(player1) + '&player2=' + encodeURIComponent(player2);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveComparison(json));
        dispatch(push(generateCompareRedirect(json.player1.name, json.player2.name)));
      });
  };
}
