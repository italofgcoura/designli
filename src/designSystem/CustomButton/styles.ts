import {StyleSheet} from 'react-native';
import Colors from '../colorsPallete';

export default StyleSheet.create({
  button: {
    // flex: 1,
    width: '100%',
    maxWidth: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: Colors.gray.light,
  },
  buttonLabelDisabled: {
    color: Colors.white,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
