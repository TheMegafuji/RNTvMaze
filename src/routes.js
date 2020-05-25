import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './pages/Home';
import theme from './themes/default';
import Login from './pages/Login';
import AnimatedTabBar from 'curved-bottom-navigation-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Details from './pages/Details';

const Stack = createStackNavigator();
const MovieStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabs = {
  Home: {
    icon: ({}) => <Icon name={'home'} size={30} color={theme.colors.white} />,
  },
  Search: {
    icon: ({}) => <Icon name={'search'} size={30} color={theme.colors.white} />,
  },
  Favorites: {
    icon: ({}) => (
      <Icon name={'favorite'} size={30} color={theme.colors.white} />
    ),
  },
};

function bottomRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => (
        <AnimatedTabBar
          barColor={theme.colors.dark_primary}
          dotColor={theme.colors.red_primary}
          duration={250}
          tabs={tabs}
          {...props}
        />
      )}
      tabBarOptions={{
        showLabel: true,
        inactiveTintColor: `${theme.colors.white}`,
        activeTintColor: theme.colors.dark_primary,
        labelStyle: {
          marginTop: -8,
          marginBottom: 8,
        },
        style: {
          borderTopColor: theme.colors.dark_primary,
          backgroundColor: theme.colors.dark_background,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen name="Home" component={homeStack} />
      <Tab.Screen name="Search" component={Home} />
      <Tab.Screen name="Favorites" component={Home} />
    </Tab.Navigator>
  );
}

function homeStack() {
  return (
    <MovieStack.Navigator initialRouteName="Home">
      <MovieStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <MovieStack.Screen
        name="Details"
        component={Details}
        options={{
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            elevation: 0,
          },
          headerTransparent: true,
          headerTintColor: '#000',
          title: '',
        }}
      />
    </MovieStack.Navigator>
  );
}

function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Preload">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={bottomRoutes}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Routes;
