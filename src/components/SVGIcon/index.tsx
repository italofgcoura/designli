import React from 'react';
import Logout from './Logout';

type IconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const iconDictionary: Record<string, React.FC<IconProps>> = {
  logout: Logout,
};

export type IconSource = keyof typeof iconDictionary;

type IProps = {
  source: IconSource;
  color?: string;
  width?: number;
  height?: number;
};

export default ({width, height, source, color}: IProps) => {
  if (!source) {
    return;
  }

  const Logo = iconDictionary[source];

  return <Logo color={color} width={width ?? 24} height={height ?? 24} />;
};
