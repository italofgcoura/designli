import React from 'react';
import {Pressable, Text} from 'react-native';
import {Colors} from '../../designSystem';
import styles from './styles';

interface IProps {
  title: string;
  onPress: () => void;
  active: boolean;
  state?: any;
  Icon?: any;
}

export default ({title, onPress, Icon, active}: IProps) => {
  const activeStyle = {
    backgroundColor: Colors.accent_fade,
  };

  const activeTextStyle = {color: Colors.accent};

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      {Icon && <Icon primary={active ? Colors.accent : Colors.primary} />}
      <Text style={[styles.title, active && activeTextStyle]}>{title}</Text>
    </Pressable>
  );
};
