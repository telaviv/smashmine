import { expect } from 'chai';
import { stub } from 'sinon';
import { fetch } from '../../src/utils/api';

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

function responseFromRawBody(body, status) {
  return new Response(body, {
    status,
    headers: { 'Content-type': 'application/json' },
  });
}

function response(data, status) {
  return responseFromRawBody(JSON.stringify(data), status);
}

function mockFetch(data, status = 200) {
  return stub().returns(Promise.resolve(response(data, status)));
}

function mockFetchFromRawBody(body, status = 200) {
  return stub().returns(
    Promise.resolve(responseFromRawBody(body, status)));
}

function mockErrorFetch() {
  return stub().returns(Promise.reject(new TypeError()));
}


describe('utils', () => {
  describe('api', () => {
    describe('fetch', () => {
      const path = 'path';
      const player = 'p1';

      it('fetches from the api', () => {
        const ifetch = mockFetch();

        fetch(path, { player }, ifetch);

        expect(ifetch).to.have.been.calledWith(
          'https://api.smashmine.com/path?player=p1');
      });

      it('converts data to json on success', () => {
        const data = { player1: { name: 'p1' }, player2: { name: 'p2' } };
        const ifetch = mockFetch(data);

        return fetch(path, {}, ifetch).then((resp) => {
          expect(resp).to.deep.equal(data);
        });
      });

      it('converts clojure-esque keys to lower camel case', () => {
        const ifetch = mockFetch(sampleData);

        return fetch(path, {}, ifetch).then((resp) => {
          expect(resp).to.deep.equal(outputData);
        });
      });

      it('returns a catchable object with simple errors', () => {
        const error1 = 'no player with that name';
        const error2 = 'other error';
        const data = { errors: {
          player1: { msg: error1 },
          player2: { msg: error2 },
        } };
        const ifetch = mockFetch(data, 400); // bad request

        return fetch(path, {}, ifetch).catch((errors) => {
          expect(errors.errors).to.deep.equal(
            { player1: error1, player2: error2 });
        });
      });

      it('returns a default object when no parseable error occurs', () => {
        const body = '<html><body><p>Error</p></body></html>';
        const ifetch = mockFetchFromRawBody(body, 400); // bad request

        return fetch(path, {}, ifetch).catch((errors) => {
          expect(errors.errors).to.have.keys('_error');
        });
      });

      it('returns a default object when a fetch error occurs', () => {
        const ifetch = mockErrorFetch();

        return fetch(path, {}, ifetch).catch((errors) => {
          expect(errors.errors).to.have.keys('_error');
        });
      });
    });
  });
});
