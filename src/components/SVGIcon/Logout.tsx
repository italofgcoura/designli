import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {Colors} from '../../designSystem';

export default ({color}: {color?: string}) => {
  return (
    <Svg
      enable-background="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill={color ?? Colors.primary}>
      <G>
        <Path d="M0,0h24v24H0V0z" fill="none" />
      </G>
      <G>
        <Path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
      </G>
    </Svg>
  );
};
