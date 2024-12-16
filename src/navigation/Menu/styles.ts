import {StyleSheet} from 'react-native';
import {Colors} from '../../designSystem';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: Colors.gray.light,
    borderTopWidth: 1,
    padding: 24,
    backgroundColor: Colors.gray.background,
  },
});

export default styles;
