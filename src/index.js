import React from 'react';
import {StatusBar, YellowBox} from 'react-native';
import Routes from './routes';
import {RootProvider} from './core';
import theme from './themes/default';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
  'componentWillReceiveProps has been renamed', // TODO: Remove when fixed
  'children with the same key', // TODO: Remove when fixed
]);

const App = () => {
  return (
    <RootProvider>
      <StatusBar
        backgroundColor={theme.colors.dark_background}
        barStyle="light-content"
      />
      <Routes />
    </RootProvider>
  );
};

export default App;
