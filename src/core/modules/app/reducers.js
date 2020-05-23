export const appInitialState = {
  loading: false,
  content: [],
  error: null,
};

export const actionsTypes = {
  REQUEST_PAGE_SUCCESS: 'app/request_page_success',
  REQUEST_PAGE_ERROR: 'app/request_page_error',
  REQUEST_PAGE_PENDING: 'app/request_page_pending',
};

export default (state, {type, payload}) => {
  switch (type) {
    case actionsTypes.REQUEST_PAGE_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionsTypes.REQUEST_PAGE_SUCCESS: {
      let newContent = Object.assign(state.content, payload);
      return {
        ...state,
        content: newContent,
        error: null,
        loading: false,
      };
    }
    case actionsTypes.REQUEST_PAGE_ERROR: {
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
