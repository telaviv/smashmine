import ifetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import URI from 'urijs';
import 'urijs/src/URITemplate';

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

function compareRedirectURL(player1, player2) {
  const uri = URI.expand('/compare/{player1}/{player2}', { player1, player2 });
  return uri.toString();
}

function compareAPIURL(player1, player2) {
  return new URI('http://localhost:3001/compare')
    .query({ player1, player2 })
    .toString();
}

function handleErrors(response) {
  if (response.ok) {
    return response;
  } else {
    return response.json()
      .then(err => { throw err;})
      .catch((err) => {
        if (err instanceof Error) {
          throw { '_error': "Something wen't wrong please try again later" };
        }
        throw err;
      });
  }
}

export function submitCompare(player1, player2, fetch=ifetch) {
  return (dispatch) => {
    dispatch(requestComparison());

    return fetch(compareAPIURL(player1, player2))
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveComparison(json));
        dispatch(push(compareRedirectURL(json.player1.name, json.player2.name)));
      })
  };
}
