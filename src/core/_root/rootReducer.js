import {combineReducers} from './_config/combineReducers';

import {appInitialState, default as appReducer} from '../modules/app/reducers';

let combinedReducers;
export default (combinedReducers = () => {
  return combineReducers({
    app: [appReducer, appInitialState],
  });
});
