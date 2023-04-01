import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Home from '../screens/Home';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Otp from '../screens/Otp';

export type MainStackParamList = {
  Home: undefined;
  Otp: {
    rollNumber: Number;
    path: string;
    phone_verified?: boolean;
    email_verified?: boolean;
  };
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const Auth = () => {
  const navigation = useNavigation();
  return (
    <MainStack.Navigator
      screenOptions={{
        header: () => (
          <>
            <BackButton />
            <Logo size={12} noBackground />
          </>
        ),
        headerRight: () => <Logo size={12} noBackground />,
      }}
      initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{header: () => <Logo size={12} noBackground />}}
      />
      <MainStack.Screen
        name="Otp"
        component={Otp}
        options={{
          header: () => <BackButton />,
        }}
      />
    </MainStack.Navigator>
  );
};

export default Auth;
