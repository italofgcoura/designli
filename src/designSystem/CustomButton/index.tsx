import React, {forwardRef} from 'react';
import {
  ButtonProps,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
} from 'react-native';

import Colors from '../colorsPallete';

import styles from './styles';

type iButton = {
  children: string;
  type?: 'alert' | 'success' | 'disabled' | 'error';
  customStyles?: StyleProp<PressableProps>;
  props?: ButtonProps;
  onPress?: () => void;
  disabled?: boolean;
};

const CustomButton = forwardRef(
  (
    {type = 'success', disabled, children, customStyles, ...props}: iButton,
    ref,
  ) => {
    const colorsTypes = {
      alert: {bg: Colors.warning, text: Colors.white},
      success: {bg: Colors.primary, text: Colors.white},
      disabled: {bg: Colors.gray.light, text: Colors.white},
      error: {bg: Colors.accent, text: Colors.white},
    };
    const buttonStyle = [
      styles.button,
      customStyles,
      {backgroundColor: colorsTypes[type]?.bg},
    ];
    return (
      <Pressable
        disabled={disabled}
        android_ripple={{color: colorsTypes[type]?.bg}}
        {...props}
        style={({pressed}) => [
          buttonStyle,
          pressed && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
        android_disableSound>
        <Text
          style={[
            {...styles.buttonTitle, color: colorsTypes[type]?.text},
            disabled && styles.buttonLabelDisabled,
          ]}>
          {children}
        </Text>
      </Pressable>
    );
  },
);

export default CustomButton;
