export const peopleInitialState = {
  loading: false,
  content: [],
  detailedPerson: null,
  error: null,
};

export const actionsTypes = {
  P_CLEAR_CONTENT: 'app/p_clear_content',
  CLEAN_DETAILS: 'app/clean_details',
  P_REQUEST_ERROR: 'app/p_request_error',
  P_REQUEST_PENDING: 'app/p_request_pending',
  REQUEST_PEOPLE_SUCCESS: 'app/request_people_success',
  REQUEST_DETAILS_SUCCESS: 'app/request_details_success',
  REQUEST_PEOPLE_SEARCH_SUCCESS: 'app/request_people_search_success',
};

export default (state, {type, payload}) => {
  switch (type) {
    case actionsTypes.P_CLEAR_CONTENT: {
      return {
        ...state,
        content: [],
        error: null,
      };
    }
    case actionsTypes.CLEAN_DETAILS: {
      return {
        ...state,
        detailedPerson: null,
        error: null,
      };
    }
    case actionsTypes.P_REQUEST_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionsTypes.P_REQUEST_ERROR: {
      return {
        ...state,
        error: 'Something went wrong.',
        loading: false,
      };
    }
    case actionsTypes.REQUEST_PEOPLE_SUCCESS: {
      let deDupeIt = (...arrs) => [...new Set([].concat(...arrs))];
      let newContent = deDupeIt(state.content, payload);
      return {
        ...state,
        content: newContent,
        error: null,
        loading: false,
      };
    }
    case actionsTypes.REQUEST_DETAILS_SUCCESS: {
      return {
        ...state,
        detailedPerson: payload,
        error: null,
        loading: false,
      };
    }
    case actionsTypes.REQUEST_PEOPLE_SEARCH_SUCCESS: {
      return {
        ...state,
        content: payload,
        error: null,
        loading: false,
      };
    }
    default:
      return state;
  }
};
