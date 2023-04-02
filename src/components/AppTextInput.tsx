import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export type AppTextInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  containerStyle?: any;
  secondary?: boolean;
  heading?: string;
  disabled?: boolean;
};

const AppTextInput: React.FC<AppTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  maxLength,
  secureTextEntry,
  keyboardType,
  containerStyle,
  secondary,
  heading,
  disabled,
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          width: secondary ? '100%' : '94%',
          alignSelf: 'flex-start',
          marginVertical: 10,
        },
        containerStyle,
      ]}>
      {secondary && (
        <Text
          style={{
            color: '#A8A3A3',
            fontFamily: 'Montserrat-Light',
            marginBottom: 5,
            marginLeft: 5,
          }}>
          {heading}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={secondary ? '#A8A3A3' : colors.primary}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={!disabled}
        style={{
          color: colors.primary,
          borderBottomColor: colors.primary,
          borderBottomWidth: secondary ? 0 : 1,
          fontSize: 16,
          fontFamily: 'Montserrat-Regular',
          height: 40,
          backgroundColor: secondary ? colors.card : 'transparent',
          borderRadius: secondary ? 10 : 0,
          paddingHorizontal: secondary ? '5%' : undefined,
        }}
      />
    </View>
  );
};

export default AppTextInput;
