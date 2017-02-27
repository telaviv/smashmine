import { PropTypes } from 'react';

const player = PropTypes.shape({
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  stddev: PropTypes.number.isRequired,
});

const match = PropTypes.shape({
  winner: PropTypes.string,
  loser: PropTypes.string,
  score: PropTypes.string.isRequired,
  tournament: PropTypes.object,
  time: PropTypes.number.isRequired,
  hide: PropTypes.array,
});

const tournament = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

const rating = PropTypes.shape({
  rating: PropTypes.number.isRequired,
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
  rating,
  tournament,
  comparison,
};
