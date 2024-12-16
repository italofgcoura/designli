import React from 'react';
import Logout from '../Logout';
import {StyleSheet, Text, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {Colors} from '../../designSystem';

export default () => {
  const {user} = useAuth0();

  return (
    <View style={styles.wrapper}>
      <View>
        {user && (
          <Text style={styles.text}>
            Hello,{' '}
            <Text style={[styles.text, styles.userName]}>
              {user?.givenName || user?.nickname}.
            </Text>
          </Text>
        )}
        <Text style={styles.text}>
          Welcome to{' '}
          <Text style={[styles.text, styles.userName]}>FinHubApp</Text>
        </Text>
      </View>
      <Logout />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    backgroundColor: Colors.gray.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.light,
    marginBottom: 16,
  },
  text: {
    fontFamily: 'Roboto-Light',
    color: Colors.primary,
  },
  userName: {fontFamily: 'Roboto-Black'},
});
