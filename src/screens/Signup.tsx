import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../navigation/AuthStack';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppTextInput from '../components/AppTextInput';
import Button from '../components/Button';

type SignupProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup: React.FC<SignupProps> = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          Sign Up
        </HrText>
        <AppTextInput placeholder="Full Name" />
        <AppTextInput placeholder="Roll Number" keyboardType='numeric' />
        <AppTextInput secureTextEntry placeholder="Password" />
        <AppTextInput placeholder="Gender" />
        <AppTextInput placeholder="Phone Number" keyboardType='numeric' />
        <Button
          primary
          onPress={() =>
            navigation.navigate('Otp', {
              rollNumber: '24100043',
              phoneNumber: '+92 303 22 33 203', // TODO: replace it with user input
              path: 'signup', // signup to otp -> gives finish btn
            })
          }>
          Continue
        </Button>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          or
        </HrText>
        <Button primary onPress={() => navigation.replace('Login')}>
          Login
        </Button>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
