import {StyleSheet} from 'react-native';
import {Colors} from '../../designSystem';

const styles = StyleSheet.create({
  wrapper: {alignItems: 'center', gap: 4},
  iconWrapper: {
    borderRadius: 32,
    height: 30,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {color: Colors.primary, fontWeight: 'bold'},
});

export default styles;
