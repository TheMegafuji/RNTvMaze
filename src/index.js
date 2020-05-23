import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './routes';
import {RootProvider} from './core';
import theme from './themes/default';

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
