import {Image} from 'react-native';
import React from 'react';

export type LogoProps = {
  size: number;
  noBackground?: boolean;
};

const Logo: React.FC<LogoProps> = ({size, noBackground = false}) => {
  if (noBackground)
    return (
      <Image
        source={require('../assets/images/logo.png')}
        style={{height: size*6, aspectRatio: 0.8, tintColor: '#F7EBE8'}}
      />
    );
  else
    return (
      <Image
        source={require('../assets/images/logo-with-background.png')}
        style={{height: size*6, aspectRatio: 1}}
      />
    );
};

export default Logo;
