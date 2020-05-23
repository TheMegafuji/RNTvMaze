import React, {useReducer} from 'react';
import createContextAndCombineReducers from './rootContext';
import combinedActions from '../rootAction';

const [
  useContext,
  Provider,
  rootReducerCombined,
  initialStateCombined,
] = createContextAndCombineReducers();

function RootProvider(props) {
  const [state, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined,
  );
  const actions = combinedActions(dispatch);

  return <Provider value={{state, actions}}>{props.children}</Provider>;
}

export {useContext, RootProvider};
