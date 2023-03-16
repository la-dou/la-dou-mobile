import {Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export type LogoProps = {
  size: number;
  noBackground?: boolean;
};

const Logo: React.FC<LogoProps> = ({size, noBackground = false}) => {
  const {colors} = useTheme();
  if (noBackground)
    return (
      <Image
        source={require('../assets/images/logo.png')}
        style={{height: size * 6, aspectRatio: 0.8, tintColor: colors.primary}}
      />
    );
  else
    return (
      <Image
        source={require('../assets/images/logo-with-background.png')}
        style={{height: size * 6, aspectRatio: 1}}
      />
    );
};

export default Logo;
