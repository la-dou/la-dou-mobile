import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Otp from '../screens/Otp';
import { Image, Text, TouchableOpacity } from 'react-native';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const Auth = () => {
  const navigation = useNavigation();
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                position: 'absolute',
                width: 24,
                height: 24,
                marginLeft: 20,
                marginTop: 20,
              }}
              source={require('../assets/images/back-arrow.png')} 
            />
          </TouchableOpacity>
        ),
      }}
      initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <AuthStack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
      <AuthStack.Screen name="Otp" component={Otp} />
    </AuthStack.Navigator>
  );
};

export default Auth;
