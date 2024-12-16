import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Menu from './Menu';
import {RootParams} from './types';
import WatchList from '../screens/WatchList';
import Alert from '../screens/Alert';
import Login from '../screens/Login';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {tRootState} from '../redux/store';
import Graph from '../screens/Graph';
import MyWatchList from '../screens/MyWatchList';

const Tab = createBottomTabNavigator<RootParams>();
const Stack = createStackNavigator<{login: undefined}>();

export default () => {
  const {isLoged} = useSelector((rootReducer: tRootState) => rootReducer.user);

  if (!isLoged) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <Menu {...props} />}
        screenOptions={{headerShown: false}}
        initialRouteName="alert">
        <Tab.Screen name="alert" component={Alert} />
        <Tab.Screen name="watchlist" component={WatchList} />
        <Tab.Screen name="graph" component={Graph} />
        <Tab.Screen name="myWatchList" component={MyWatchList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export type RootNavigationProps = BottomTabScreenProps<
  RootParams,
  keyof RootParams
>['navigation'];
