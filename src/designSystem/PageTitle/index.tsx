import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import Colors from '../colorsPallete';

interface iPageTitle {
  pageTitle: string;
  style?: StyleProp<TextStyle>;
}

export default ({ pageTitle, style }: iPageTitle) => {
  return <Text style={[styles.pageTitle, style]}>{pageTitle}</Text>;
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.main_text,
    textAlign: 'center',
    fontFamily: 'Comme-Bold',
    // backgroundColor: 'red',
    // marginTop: 16,
  },
});
