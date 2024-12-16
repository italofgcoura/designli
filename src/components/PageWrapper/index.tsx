import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../designSystem';
import Header from '../Header';

export default function ({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.wrapper}>
      <Header />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {backgroundColor: Colors.gray.background, flex: 1, padding: 16},
});
