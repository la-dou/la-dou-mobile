import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {register} from '../api/Auth';
import {AuthStackParamList} from '../navigation/AuthStack';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppTextInput from '../components/AppTextInput';
import Button from '../components/Button';

type SignupProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup: React.FC<SignupProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [rollNumber, setRollNumber] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [gender, setGender] = React.useState('');

  const handleSubmit = async () => {
    try {
      const res = await register(
        Number(rollNumber),
        password,
        fullName,
        gender,
        phoneNumber,
      );
      console.log(res);
      navigation.navigate('Otp', {
        rollNumber: Number(rollNumber),
        path: 'signup', // signup to otp -> gives finish btn
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          Sign Up
        </HrText>
        <AppTextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <AppTextInput
          placeholder="Roll Number"
          keyboardType="numeric"
          value={rollNumber}
          onChangeText={setRollNumber}
        />
        <AppTextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <AppTextInput
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        <AppTextInput
          placeholder="Phone Number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Button primary onPress={handleSubmit}>
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
