import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../redux/user/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, CustomButton} from '../../designSystem';

export default () => {
  const {authorize} = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userToken = await AsyncStorage.getItem('token');

      if (userToken) {
        dispatch(loginUser(true));
      }
    })();
  }, []);

  const onPress = async () => {
    try {
      const result = await authorize();

      if (result) {
        await AsyncStorage.setItem('token', JSON.stringify(result));
        dispatch(loginUser(true));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        Hello, welcome to <Text style={styles.appTitle}>FinHubApp</Text>
      </Text>
      <CustomButton onPress={onPress}>Login</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.gray.background,
    gap: 24,
  },
  appTitle: {
    fontFamily: 'Roboto-Black',
    color: Colors.primary,
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Roboto-Light',
    color: Colors.primary,
    fontSize: 20,
    textAlign: 'center',
  },
});
