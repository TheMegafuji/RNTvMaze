import {combineReducers} from './_config/combineReducers';

import {appInitialState, default as appReducer} from '../modules/app/reducers';
import {
  peopleInitialState,
  default as peopleReducer,
} from '../modules/people/reducers';

let combinedReducers;
export default (combinedReducers = () => {
  return combineReducers({
    app: [appReducer, appInitialState],
    people: [peopleReducer, peopleInitialState],
  });
});
