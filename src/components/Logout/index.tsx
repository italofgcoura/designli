import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../redux/user/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SVGIcon from '../SVGIcon';

export default () => {
  return <LogoutButton />;
};

const LogoutButton = () => {
  const {clearSession} = useAuth0();

  const dispatch = useDispatch();

  const onPress = async () => {
    try {
      await clearSession();
      await AsyncStorage.removeItem('token');
      dispatch(loginUser(false));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <SVGIcon source="logout" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {},
});
