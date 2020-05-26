import {actionsTypes} from './reducers';
import client from './client';
import NetInfo from '@react-native-community/netinfo';

export default dispatch => ({
  requestPeople: async (clean = false) => {
    dispatch({
      type: actionsTypes.P_REQUEST_PENDING,
    });

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        console.log('No connection');
        return null;
      }

      if (clean) {
        await dispatch({
          type: actionsTypes.P_CLEAR_CONTENT,
        });
      }
      for (let i = 1; i < 20; i++) {
        let peopleResult = await client.getPeople(i);

        if (!peopleResult) {
          dispatch({
            type: actionsTypes.P_REQUEST_ERROR,
          });
          return;
        }

        dispatch({
          type: actionsTypes.REQUEST_PEOPLE_SUCCESS,
          payload: peopleResult,
        });
      }
    } catch (err) {
      console.log('Exception');
      console.log(err);
      dispatch({
        type: actionsTypes.P_REQUEST_ERROR,
      });
    }
  },
  requestPersonInfo: async id => {
    dispatch({
      type: actionsTypes.P_REQUEST_PENDING,
    });

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        console.log('No connection');
        return null;
      }

      let personResult = await client.getPerson(id);

      if (!personResult) {
        dispatch({
          type: actionsTypes.P_REQUEST_ERROR,
        });
        return;
      }

      dispatch({
        type: actionsTypes.REQUEST_DETAILS_SUCCESS,
        payload: personResult,
      });
    } catch (err) {
      console.log('Exception');
      console.log(err);
      dispatch({
        type: actionsTypes.P_REQUEST_ERROR,
      });
    }
  },
  clearDetails: async => {
    dispatch({
      type: actionsTypes.CLEAN_DETAILS,
    });
  },
  peopleSearch: async searchTerm => {
    dispatch({
      type: actionsTypes.P_REQUEST_PENDING,
    });

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        console.log('No connection');
        return null;
      }

      let searchResult = await client.peopleSearch(searchTerm);

      if (!searchResult) {
        dispatch({
          type: actionsTypes.P_REQUEST_ERROR,
        });
        return;
      }

      dispatch({
        type: actionsTypes.REQUEST_PEOPLE_SEARCH_SUCCESS,
        payload: searchResult,
      });
    } catch (err) {
      console.log('Exception');
      console.log(err);
      dispatch({
        type: actionsTypes.P_REQUEST_ERROR,
      });
    }
  },
});
