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
import Favorites from './pages/Favorites';
import People from './pages/People';
import PeopleDetails from './pages/PeopleDetails';

const Stack = createStackNavigator();
const MovieStack = createStackNavigator();
const PeopleStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabs = {
  Home: {
    icon: ({}) => <Icon name={'home'} size={30} color={theme.colors.white} />,
  },
  People: {
    icon: ({}) => <Icon name={'people'} size={30} color={theme.colors.white} />,
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
      <Tab.Screen name="People" component={peopleStack} />
      <Tab.Screen name="Favorites" component={favoritesStack} />
    </Tab.Navigator>
  );
}

function peopleStack() {
  return (
    <PeopleStack.Navigator initialRouteName="People">
      <PeopleStack.Screen
        name="People"
        component={People}
        options={{headerShown: false}}
      />
      <PeopleStack.Screen
        name="PeopleDetails"
        component={PeopleDetails}
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
      <PeopleStack.Screen
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
    </PeopleStack.Navigator>
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
      <MovieStack.Screen
        name="PeopleDetails"
        component={PeopleDetails}
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

function favoritesStack() {
  return (
    <FavoritesStack.Navigator initialRouteName="Favorites">
      <FavoritesStack.Screen
        name="Favorites"
        component={Favorites}
        options={{headerShown: false}}
      />
      <FavoritesStack.Screen
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
      <FavoritesStack.Screen
        name="PeopleDetails"
        component={PeopleDetails}
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
    </FavoritesStack.Navigator>
  );
}

function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
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
