import { REQUEST_PLAYER_INFO,
         RECIEVE_PLAYER_INFO } from '../../src/actions/player';

function capitalizeFirstCharacter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function normalizeKey(key) {
  const parts = key.split(/-|_/);
  const out = [parts[0], ...(parts.splice(1).map(capitalizeFirstCharacter))];
  return out.join('');
}

function normalizeKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(normalizeKeys);
  } else if (typeof obj === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(obj)) {
      out[normalizeKey(key)] = value;
    }
    return out;
  }
  return obj;
}

export default function player(state = { isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_PLAYER_INFO:
      return { isFetching: true };
    case RECIEVE_PLAYER_INFO: {
      return {
        isFetching: false,
        player: action.data.player,
        matches: action.data.matches.map(normalizeKeys),
      };
    }
    default:
      return state;
  }
}
