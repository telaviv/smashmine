/* eslint no-console: 0 */
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import URI from 'urijs';
import 'urijs/src/URITemplate';

export const REQUEST_PLAYER_INFO = 'REQUEST_PLAYER_INFO';
export const RECIEVE_PLAYER_INFO = 'RECIEVE_PLAYER_INFO';
export const PLAYER_INFO_REQUEST_FAILED = 'PLAYER_INFO_REQUEST_FAILED';

function requestPlayerInfo() {
  return { type: REQUEST_PLAYER_INFO };
}

function receivePlayerInfo(data) {
  return {
    type: RECIEVE_PLAYER_INFO,
    data,
  };
}

function playerInfoURL(playerName) {
  return new URI('http://localhost:3001/player')
    .query({ name: playerName })
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

export function fetchPlayerInfo(player) {
  return (dispatch) => {
    dispatch(requestPlayerInfo());

    return fetch(playerInfoURL(player))
      .catch(handleFetchErrors)
      .then(handleServerErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(receivePlayerInfo(json));
        if (json.player.name !== player) {
          dispatch(push(playerInfoURL(json.player.name)));
        }
      })
      .catch(err => {
        dispatch({ type: PLAYER_INFO_REQUEST_FAILED });
        throw err;
      });
  };
}
