/* eslint no-console: 0 */
import isoFetch from 'isomorphic-fetch';
import URI from 'urijs';
import { SubmissionError } from 'redux-form';

const BASE_URL = 'http://localhost:3001/';

function capitalizeFirstCharacter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function normalizeKey(key) {
  const parts = key.split(/-|_/);
  const out = [parts[0], ...(parts.splice(1).map(capitalizeFirstCharacter))];
  return out.join('');
}

export function normalizeKeys(obj) {
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

function createURL(path, query) {
  return new URI(BASE_URL + path)
    .query(query)
    .toString();
}

export function fetch(path, query, ifetch = isoFetch) {
  return ifetch(createURL(path, query))
    .catch(handleFetchErrors)
    .then(handleServerErrors)
    .then(response => response.json())
    .then(normalizeKeys);
}
