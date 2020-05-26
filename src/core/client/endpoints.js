const BASE_PATH = 'http://api.tvmaze.com';

let endpoints;
export default (endpoints = {
  SEARCH: BASE_PATH + '/search/shows',
  SHOWS: BASE_PATH + '/shows',
  PEOPLE: BASE_PATH + '/people',
  PEOPLE_SEARCH: BASE_PATH + '/search/people',
});
