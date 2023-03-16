import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export type AppTextInputProps = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};

const AppTextInput: React.FC<AppTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  maxLength,
  secureTextEntry,
  keyboardType,
}) => {
  const {colors} = useTheme();
  return (
    <View style={{width: '94%', alignSelf: 'flex-start'}}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.primary}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={{
          color: colors.primary,
          borderBottomColor: colors.primary,
          borderBottomWidth: 1,
          fontSize: 16,
          fontFamily: 'Montserrat-Light',
          width: '100%',
          height: 40,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
