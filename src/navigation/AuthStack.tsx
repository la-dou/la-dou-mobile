import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Otp from '../screens/Otp';
import ForgetPassword from '../screens/ForgetPassword';
import NewPassword from '../screens/NewPassword';
import BackButton from '../components/BackButton';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: {rollNumber: string; phoneNumber: string; path: string};
  ForgetPassword: undefined;
  NewPassword: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const Auth = () => {
  const navigation = useNavigation();
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => <BackButton />,
      }}
      initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <AuthStack.Screen name="Otp" component={Otp} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
      <AuthStack.Screen name="NewPassword" component={NewPassword} />
    </AuthStack.Navigator>
  );
};

const style = StyleSheet.create({
  header: {
    position: 'absolute',
    width: 24,
    height: 24,
    marginLeft: 20,
    marginTop: 20,
  },
});

export default Auth;
