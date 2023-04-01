import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const CheckButton = () => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#591028',
        borderRadius: 5,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

        alignSelf: 'flex-end',

        height: '100%',
      }}>
      <Image
        source={require('../assets/images/logo-check.png')}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
};

export default CheckButton;
