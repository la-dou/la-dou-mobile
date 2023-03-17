import {Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export type CheckProps = {
  size: number;
};

const Check: React.FC<CheckProps> = ({size}) => {
  const {colors} = useTheme();
  return (
    <Image
      source={require('../assets/images/check.png')}
      style={{height: size, aspectRatio: 1, tintColor: colors.primary}}
    />
  );
};

export default Check;
