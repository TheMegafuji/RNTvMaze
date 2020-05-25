import {actionsTypes} from './reducers';
import client from './client';
import NetInfo from '@react-native-community/netinfo';

export default dispatch => ({
  requestPage: async pageNumber => {
    dispatch({
      type: actionsTypes.REQUEST_PENDING,
    });

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        console.log('No connection');
        return null;
      }

      if (pageNumber == 0) {
        await dispatch({
          type: actionsTypes.CLEAR_CONTENT,
        });
      }

      let pageInfo = await client.getPage(pageNumber);

      if (!pageInfo) {
        dispatch({
          type: actionsTypes.REQUEST_ERROR,
        });
        return;
      }

      dispatch({
        type: actionsTypes.REQUEST_PAGE_SUCCESS,
        payload: pageInfo,
      });
    } catch (err) {
      console.log('Exception');
      console.log(err);
      dispatch({
        type: actionsTypes.REQUEST_ERROR,
      });
    }
  },
  requestSearch: async searchTerm => {
    dispatch({
      type: actionsTypes.REQUEST_PENDING,
    });

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        console.log('No connection');
        return null;
      }

      let searchResult = await client.search(searchTerm);

      if (!searchResult) {
        dispatch({
          type: actionsTypes.REQUEST_ERROR,
        });
        return;
      }

      dispatch({
        type: actionsTypes.REQUEST_SEARCH_SUCCESS,
        payload: searchResult,
      });
    } catch (err) {
      console.log('Exception');
      console.log(err);
      dispatch({
        type: actionsTypes.REQUEST_ERROR,
      });
    }
  },
  requestShow: async id => {
    dispatch({
      type: actionsTypes.REQUEST_PENDING,
    });

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        console.log('No connection');
        return null;
      }
      let show = await client.getShow(id);
      if (!show) {
        dispatch({
          type: actionsTypes.REQUEST_ERROR,
        });
        return;
      }

      dispatch({
        type: actionsTypes.REQUEST_SHOW_SUCCESS,
        payload: show,
      });
    } catch (err) {
      console.log('Exception');
      console.log(err);
      dispatch({
        type: actionsTypes.REQUEST_ERROR,
      });
    }
  },
  cleanDetails: async => {
    dispatch({
      type: actionsTypes.CLEAR_DETAILS,
    });
  },
  requestEpisodes: async id => {
    dispatch({
      type: actionsTypes.REQUEST_EPISODES_PENDING,
    });

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        console.log('No connection');
        return null;
      }
      let episodes = await client.getEpisodes(id);
      if (!episodes) {
        dispatch({
          type: actionsTypes.REQUEST_EPISODES_ERROR,
        });
        return;
      }

      dispatch({
        type: actionsTypes.REQUEST_EPISODES_SUCCESS,
        payload: episodes,
      });
    } catch (err) {
      console.log('Exception');
      console.log(err);
      dispatch({
        type: actionsTypes.REQUEST_EPISODES_ERROR,
      });
    }
  },
});
