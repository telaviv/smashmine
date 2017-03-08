import { PropTypes } from 'react';

const player = PropTypes.shape({
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  stddev: PropTypes.number.isRequired,
});

const tournament = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number,
  url: PropTypes.string,
});

const match = PropTypes.shape({
  winner: PropTypes.string,
  loser: PropTypes.string,
  score: PropTypes.string.isRequired,
  tournament,
  time: PropTypes.number,
  hide: PropTypes.array,
});

const rating = PropTypes.shape({
  rating: PropTypes.number.isRequired,
});

const playerMatch = PropTypes.shape({
  id: PropTypes.number.isRequired,
  opponent: PropTypes.string.isRequired,
  startRating: rating.isRequired,
  endRating: rating.isRequired,
  won: PropTypes.bool.isRequired,
  tournament: tournament.isRequired,
  time: PropTypes.number.isRequired,
});

const comparison = PropTypes.shape({
  player1: player.isRequired,
  player2: player.isRequired,
  matches: PropTypes.arrayOf(match).isRequired,
  winPercentage: PropTypes.number.isRequired,
});

export default {
  player,
  match,
  playerMatch,
  tournament,
  comparison,
};
