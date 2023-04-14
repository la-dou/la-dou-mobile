import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export type ButtonProps = {
  children: string;
  primary?: boolean;
  onPress?: () => void;
  inactive?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  onPress,
  inactive,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: primary ? colors.primary : colors.border,
        borderRadius: 10,
        height: 38,
        width: '90%',
        marginVertical: 10,
        opacity: inactive ? 0.3 : 1,
        alignSelf: 'center',
      }}
      onPress={onPress}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: primary ? colors.border : colors.primary,
            textAlign: 'center',
            fontSize: 16,
            lineHeight: 38,
          }}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
