import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();

import dark from './dark';
import light from './light';

const Colors = colorScheme === 'dark' ? dark : light;

export default Colors;
