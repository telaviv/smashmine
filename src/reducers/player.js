import { REQUEST_PLAYER_INFO,
         RECIEVE_PLAYER_INFO } from '../../src/actions/player';

function normalizeMatchKeys(match) {
  return {
    opponent: match.opponent,
    won: match.won,
    winPercentage: match['win-percentage'],
    time: match.time,
    tournament: match.tournament,
    startRating: match.start_rating,
    endRating: match.end_rating,
    opponentRating: match.opponent_rating,
    id: match.id,
    score: match.score,
  };
}

export default function player(state = { isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_PLAYER_INFO:
      return { isFetching: true };
    case RECIEVE_PLAYER_INFO: {
      return {
        isFetching: false,
        player: action.data.player,
        matches: action.data.matches.map((m) => normalizeMatchKeys(m)),
      };
    }
    default:
      return state;
  }
}
