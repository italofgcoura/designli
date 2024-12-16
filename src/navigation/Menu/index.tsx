import {NavigationState} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

import MenuItem from '../MenuItem';
import styles from './styles';
import {RootNavigationProps} from '..';
interface IProps {
  state: NavigationState;
  navigation: RootNavigationProps;
}

const Menu = ({state, navigation}: IProps) => {
  const navigate = (screenName: 'alert' | 'watchlist' | 'graph') => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.wrapper}>
      <MenuItem
        title="Alert"
        onPress={() => navigate('alert')}
        active={state.index === 0}
      />
      <MenuItem
        title="Watchlist"
        onPress={() => navigation.navigate('watchlist')}
        active={state.index === 1}
      />

      <MenuItem
        title="Graph"
        onPress={() => navigation.navigate('graph')}
        active={state.index === 2}
      />
      <MenuItem
        title="My watch list"
        onPress={() => navigation.navigate('myWatchList')}
        active={state.index === 3}
      />
    </View>
  );
};

export default Menu;
