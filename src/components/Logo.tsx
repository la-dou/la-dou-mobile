import {Image, Keyboard} from 'react-native';
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
        style={{
          // position it on the top right
          position: 'absolute',
          top: 5,
          right: 15,
          // set the size
          width: size * 6,
          height: size * 6,
          resizeMode: 'contain',
          tintColor: colors.primary,
          zIndex: 1,
        }}
      />
    );
  else
    return (
      <Image
        source={require('../assets/images/logo-with-background.png')}
        style={{
          height: size * 6, aspectRatio: 1}}
      />
    );
};

//height: size * 6, aspectRatio: 0.8, tintColor: colors.primary,
export default Logo;
