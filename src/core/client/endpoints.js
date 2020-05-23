const BASE_PATH = 'http://api.tvmaze.com';

let endpoints;
export default (endpoints = {
  SEARCH: BASE_PATH + '/search/shows',
  SHOWS: BASE_PATH + '/shows',
  SINGLE_SHOW: BASE_PATH + '/singlesearch/shows',
  SHOW_LOOKUP: BASE_PATH + '/lookup/shows',
  PEOPLE_SEARCH: BASE_PATH + '/search/people',
  SHOW_INFO: BASE_PATH + '/shows/ID_PLHOLD',
  SHOW_EPISODES: BASE_PATH + '/shows/ID_PLHOLD/episodes',
});
