import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../designSystem';

export default () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Stock marcket is closed.</Text>
      <Text style={styles.text}>Come back latter :)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  text: {fontFamily: 'Roboto-Medium', color: Colors.main_text, fontSize: 20},
});
