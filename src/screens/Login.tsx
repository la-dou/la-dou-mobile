import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';

import {authToken as authTokenAtom} from '../atoms';
import {AuthStackParamList} from '../navigation/AuthStack';
import {login} from '../api/Auth';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';

type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [rollNumber, setRollNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  const handleLogin = () => {
    // handle incorrect input formats
    try {
      const rollNumberInt = parseInt(rollNumber);
      if (isNaN(rollNumberInt)) {
        throw new Error('Roll Number is not a number');
      }
      if (password.length < 8) {
        throw new Error('Password is too short');
      }
    } catch (error) {
      console.log(error);
    }
    // handle API call
    // update state
    login(rollNumber, password)
      .then(response => {
        console.log(response);
        setAuthToken(response.access_token);
      })
      .catch(error => {
        console.log(error);
      });
    // store token in encrypted storage
    EncryptedStorage.setItem('token', authToken);
  };

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
        <AppButton primary onPress={handleLogin}>
          Continue
        </AppButton>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          or
        </HrText>
        <AppButton primary>Forgot Passsword?</AppButton>
        <AppButton primary onPress={() => navigation.replace('Signup')}>
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
