import React from 'react';
import {ForwardedRef, forwardRef} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import CustomInput from '../CustomInput';

interface iProps {
  props: TextInputProps;
  children: React.ReactNode;
}

const InputWithIcon = forwardRef(
  ({children, props}: iProps, ref: ForwardedRef<TextInput>) => {
    return (
      <View style={{position: 'relative'}}>
        <CustomInput ref={ref} {...props} />
        <View style={{position: 'absolute', right: 16, top: '25%'}}>
          {children}
        </View>
      </View>
    );
  },
);

export default InputWithIcon;
