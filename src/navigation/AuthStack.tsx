import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Otp from '../screens/Otp';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Otp" component={Otp} />
    </AuthStack.Navigator>
  );
};

export default Auth;
