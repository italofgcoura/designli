import React, {ForwardedRef, forwardRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import Colors from '../colorsPallete';
const CustomInput = forwardRef(
  (props: TextInputProps, ref: ForwardedRef<TextInput>) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <TextInput
        ref={ref}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={Colors.main_text}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        cursorColor={Colors.gray.light}
        caretHidden={false}
        {...props}
        style={[
          styles.container,
          isFocused && styles.inputFocused,
          props.style,
        ]}
      />
    );
  },
);

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.gray.border,
    paddingHorizontal: 16,
    paddingRight: 4,
    paddingVertical: 8,
    borderRadius: 4,
    fontFamily: 'Comme-Regular',
    fontSize: 12,
    width: '100%',
    maxWidth: '100%',
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
});
