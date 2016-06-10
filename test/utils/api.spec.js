import { expect } from 'chai';
import { stub } from 'sinon';
import { fetch } from '../../src/utils/api';

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
  return stub().returns(Promise.reject(new TypeError));
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
          'http://localhost:3001/path?player=p1');
      });

      it('converts data to json on success', () => {
        const data = { player1: { name: 'p1' }, player2: { name: 'p2' } };
        const ifetch = mockFetch(data);

        return fetch(path, {}, ifetch).then((resp) => {
          expect(resp).to.deep.equal(data);
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
