import {actionsTypes} from './reducers';
import client from './client';
import NetInfo from '@react-native-community/netinfo';

export default dispatch => ({
  requestPage: async pageNumber => {
    dispatch({
      type: actionsTypes.REQUEST_PAGE_PENDING,
    });

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        console.log('No connection');
        return null;
      }

      let pageInfo = await client.getPage(pageNumber);

      if (!pageInfo) {
        dispatch({
          type: actionsTypes.REQUEST_PAGE_ERROR,
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
        type: actionsTypes.REQUEST_PAGE_ERROR,
      });
    }
  },
});
