import { expect } from 'chai';
import player from '../../src/reducers/player';
import { REQUEST_PLAYER_INFO,
         RECIEVE_PLAYER_INFO } from '../../src/actions/player';

const sampleData = {
  player: {
    aliases: ['Big Sean'],
    name: 'Big Sean',
    rating: 1699.437813085765,
    volatility: 0.05915510770252547,
    stddev: 43.17427830355858,
  },
  matches: [
    {
      opponent: 'BaSK | Condor Correct',
      won: false,
      'win-percentage': 0.3712364501968292,
      time: 1465535222108,
      tournament: 'Come on and Ban 63',
      start_rating: {
        rating: 1703.289294209862,
        volatility: 0.05918089106999549,
        stddev: 43.46773355826426,
      },
      id: 55965,
      score: '0-2',
      opponent_rating: {
        rating: 1798.5537069900454,
        volatility: 0.059915578322713166,
        stddev: 79.78787717143523,
      },
      end_rating: {
        rating: 1699.437813085765,
        volatility: 0.05915510770252547,
        stddev: 43.17427830355858,
      },
    },
    {
      opponent: 'AMC | Gunrose',
      won: true,
      'win-percentage': 0.7770432656435663,
      time: 1465533911544,
      tournament: 'Come on and Ban 63',
      start_rating: {
        rating: 1701.326752554484,
        volatility: 0.059183447461164815,
        stddev: 43.659154247794966,
      },
      id: 55949,
      score: '2-0',
      opponent_rating: {
        rating: 1471.540591551551,
        volatility: 0.060033415683545456,
        stddev: 101.24947205595947,
      },
      end_rating: {
        rating: 1703.289294209862,
        volatility: 0.05918089106999549,
        stddev: 43.46773355826426,
      },
    },
  ],
};

const outputData = {
  isFetching: false,
  player: {
    aliases: ['Big Sean'],
    name: 'Big Sean',
    rating: 1699.437813085765,
    volatility: 0.05915510770252547,
    stddev: 43.17427830355858,
  },
  matches: [
    {
      opponent: 'BaSK | Condor Correct',
      won: false,
      winPercentage: 0.3712364501968292,
      time: 1465535222108,
      tournament: 'Come on and Ban 63',
      startRating: {
        rating: 1703.289294209862,
        volatility: 0.05918089106999549,
        stddev: 43.46773355826426,
      },
      id: 55965,
      score: '0-2',
      opponentRating: {
        rating: 1798.5537069900454,
        volatility: 0.059915578322713166,
        stddev: 79.78787717143523,
      },
      endRating: {
        rating: 1699.437813085765,
        volatility: 0.05915510770252547,
        stddev: 43.17427830355858,
      },
    },
    {
      opponent: 'AMC | Gunrose',
      won: true,
      winPercentage: 0.7770432656435663,
      time: 1465533911544,
      tournament: 'Come on and Ban 63',
      startRating: {
        rating: 1701.326752554484,
        volatility: 0.059183447461164815,
        stddev: 43.659154247794966,
      },
      id: 55949,
      score: '2-0',
      opponentRating: {
        rating: 1471.540591551551,
        volatility: 0.060033415683545456,
        stddev: 101.24947205595947,
      },
      endRating: {
        rating: 1703.289294209862,
        volatility: 0.05918089106999549,
        stddev: 43.46773355826426,
      },
    },
  ],
};

describe('reducers', () => {
  describe('player', () => {
    it('handles initial state', () => {
      expect(player(undefined, {})).to.deep.equal({ isFetching: false });
    });

    it('handles REQUEST_PLAYER_INFO', () => {
      expect(player(undefined, { type: REQUEST_PLAYER_INFO })).to.deep.equal(
        { isFetching: true },
      );
    });

    it('handles RECIEVE_PLAYER_INFO', () => {
      expect(player(
        undefined,
        { type: RECIEVE_PLAYER_INFO, data: sampleData },
      )).to.deep.equal(outputData);
    });
  });
});
