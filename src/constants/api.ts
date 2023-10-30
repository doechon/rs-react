// original get from: https://github.com/letscode-dev/react-star-wars/blob/master/src/constants/api.js

// common
export const HTTPS = 'https://';

// swapi
export const SWAPI_ROOT = 'swapi.dev/api/';
export const SWAPI_PEOPLE = 'people';
export const SWAPI_PARAM_PAGE = '/?page=';
export const SWAPI_PARAM_SEARCH = '/?search=';

export const API_PEOPLE = HTTPS + SWAPI_ROOT + SWAPI_PEOPLE;
export const API_SEARCH = HTTPS + SWAPI_ROOT + SWAPI_PEOPLE + SWAPI_PARAM_SEARCH;

export const API_ERROR = HTTPS + SWAPI_ROOT + 'error';
