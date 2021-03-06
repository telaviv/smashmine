/* eslint no-console: 0 */
import { replace } from 'react-router-redux';
import URI from 'urijs';
import 'urijs/src/URITemplate';
import { fetch as apiFetch } from '../utils/api';

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

function playerInfoURL(player) {
  return URI.expand('/player/{player}', { player }).toString();
}

export function fetchPlayerInfo(player, fetch = apiFetch) {
  return (dispatch) => {
    dispatch(requestPlayerInfo());

    return fetch('player', { name: player })
      .then((json) => {
        dispatch(receivePlayerInfo(json));
        if (json.player.name !== player) {
          dispatch(replace(playerInfoURL(json.player.name)));
        }
      })
      .catch((err) => {
        dispatch({ type: PLAYER_INFO_REQUEST_FAILED });
        dispatch(replace('/not-found'));
        throw err;
      });
  };
}
