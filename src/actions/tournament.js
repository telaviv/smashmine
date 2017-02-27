/* eslint no-console: 0 */
import { replace } from 'react-router-redux';
import 'urijs/src/URITemplate';
import { fetch as apiFetch } from '../utils/api';


export const REQUEST_TOURNAMENT_INFO = 'REQUEST_TOURNAMENT_INFO';
export const RECIEVE_TOURNAMENT_INFO = 'RECIEVE_TOURNAMENT_INFO';
export const TOURNAMENT_INFO_REQUEST_FAILED = 'TOURNAMENT_INFO_REQUEST_FAILED';

function requestTournamentInfo() {
  return { type: REQUEST_TOURNAMENT_INFO };
}

function receiveTournamentInfo(data) {
  return {
    type: RECIEVE_TOURNAMENT_INFO,
    data,
  };
}

export function fetchTournamentInfo(tournament, fetch = apiFetch) {
  return (dispatch) => {
    dispatch(requestTournamentInfo());

    return fetch('tournament', { id: tournament })
      .then((json) => {
        dispatch(receiveTournamentInfo(json));
      })
      .catch((err) => {
        dispatch({ type: TOURNAMENT_INFO_REQUEST_FAILED });
        dispatch(replace('/not-found'));
        throw err;
      });
  };
}
