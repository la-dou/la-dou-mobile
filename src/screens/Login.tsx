import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';

const Login = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>Login</HrText>
        <AppButton primary>Continue</AppButton>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>or</HrText>
        <AppButton primary>Forgot Passsword?</AppButton>
        <AppButton primary onPress={() => navigation.navigate('Signup')}>Signup</AppButton>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
