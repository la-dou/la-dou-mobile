import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';

const Login = ({navigation}) => {
  const {colors} = useTheme();
  const [rollNumber, setRollNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          Login
        </HrText>
        <AppTextInput
          placeholder="Roll Number"
          value={rollNumber}
          onChangeText={setRollNumber}
          maxLength={8}
          keyboardType="numeric"
        />
        <AppTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AppButton primary>Continue</AppButton>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          or
        </HrText>
        <AppButton primary>Forgot Passsword?</AppButton>
        <AppButton primary onPress={() => navigation.navigate('Signup')}>
          Signup
        </AppButton>
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
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
