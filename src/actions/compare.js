/* eslint no-console: 0 */
import ifetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
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

function compareAPIURL(player1, player2) {
  return new URI('http://localhost:3001/compare')
    .query({ player1, player2 })
    .toString();
}

function normalizeServerErrors(error) {
  const errors = error.errors;
  const normalized = {};
  for (const [key, value] of Object.entries(errors)) {
    normalized[key] = value.msg;
  }
  return normalized;
}

function handleServerErrors(response) {
  if (response.ok) {
    return response;
  }

  return response
    .json()
    .then(err => {
      const errors = normalizeServerErrors(err);
      throw new SubmissionError(errors);
    })
    .catch((err) => {
      if (!(err instanceof SubmissionError)) {
        throw new SubmissionError(
          { _error: "Something wen't wrong please try again later" }
        );
      }
      throw err;
    });
}

function handleFetchErrors(err) {
  console.error(err);
  if (err instanceof TypeError) {
    throw new SubmissionError(
      { _error: "Something wen't wrong please try again later" }
    );
  } else {
    throw err;
  }
}

export function submitCompare(player1, player2, fetch = ifetch) {
  return (dispatch) => {
    dispatch(requestComparison());

    return fetch(compareAPIURL(player1, player2))
      .catch(handleFetchErrors)
      .then(handleServerErrors)
      .then(response => response.json())
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
