import React, {createContext} from 'react';
import combinedReducers from '../rootReducer';

function createContextAndCombineReducers() {
  const [rootReducerCombined, initialStateCombined] = combinedReducers();

  const RootContext = createContext(initialStateCombined);

  const useContext = () => {
    const c = React.useContext(RootContext);
    if (!c) {
      throw new Error('');
    }
    return c;
  };

  return [
    useContext,
    RootContext.Provider,
    rootReducerCombined,
    initialStateCombined,
  ];
}

export default createContextAndCombineReducers;
