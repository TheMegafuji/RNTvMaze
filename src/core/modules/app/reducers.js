export const appInitialState = {
  loading: false,
  content: [],
  error: null,
};

export const actionsTypes = {
  CLEAR_CONTENT: 'app/clear_content',
  REQUEST_ERROR: 'app/request_error',
  REQUEST_PENDING: 'app/request_pending',
  REQUEST_PAGE_SUCCESS: 'app/request_page_success',
  REQUEST_SEARCH_SUCCESS: 'app/request_search_success',
};

export default (state, {type, payload}) => {
  switch (type) {
    case actionsTypes.CLEAR_CONTENT: {
      return {
        ...state,
        content: [],
        error: null,
      };
    }
    case actionsTypes.REQUEST_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionsTypes.REQUEST_PAGE_SUCCESS: {
      let deDupeIt = (...arrs) => [...new Set([].concat(...arrs))];
      let newContent = deDupeIt(state.content, payload);
      return {
        ...state,
        content: newContent,
        error: null,
        loading: false,
      };
    }
    case actionsTypes.REQUEST_SEARCH_SUCCESS: {
      return {
        ...state,
        content: payload,
        error: null,
        loading: false,
      };
    }
    case actionsTypes.REQUEST_ERROR: {
      return {
        ...state,
        error: 'Something went wrong.',
        loading: false,
      };
    }
    default:
      return state;
  }
};
