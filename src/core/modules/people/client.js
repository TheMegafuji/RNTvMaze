import axios from 'axios';
import endpoints from '../../client/endpoints';

const getPeople = async idNumber => {
  if (idNumber == null) {
    return Promise.reject(new Error('No id number sent'));
  }
  const url = endpoints.PEOPLE + `/${idNumber}`;

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

const getPerson = async idNumber => {
  if (idNumber == null) {
    return Promise.reject(new Error('No id number sent'));
  }
  const url = endpoints.PEOPLE + `/${idNumber}/castcredits?embed=show`;

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

const peopleSearch = async searchTerm => {
  if (searchTerm == null) {
    return Promise.reject(new Error('No search term sent'));
  }
  const url = endpoints.PEOPLE_SEARCH + `?q=${searchTerm}`;

  return axios
    .get(url, {}, {})
    .then(async function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.data.map(item => {
          return {...item.person, score: item.score};
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
  getPeople,
  getPerson,
  peopleSearch,
};

export default client;
