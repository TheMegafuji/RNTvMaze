import axios from 'axios';
import endpoints from '../../client/endpoints';

const getPage = async pageNumber => {
  if (pageNumber == null) {
    return Promise.reject(new Error('No page number sent'));
  }
  const url = endpoints.SHOWS + `?page=${pageNumber}`;

  return axios
    .get(url, {}, {})
    .then(async function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return Promise.reject({
          status: response.status,
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const search = async searchTerm => {
  if (searchTerm == null) {
    return Promise.reject(new Error('No search term sent'));
  }
  const url = endpoints.SEARCH + `?q=${searchTerm}`;

  return axios
    .get(url, {}, {})
    .then(async function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.data.map(item => {
          return {...item.show, score: item.score};
        });
      } else {
        return Promise.reject({
          status: response.status,
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const client = {
  getPage,
  search,
};

export default client;
