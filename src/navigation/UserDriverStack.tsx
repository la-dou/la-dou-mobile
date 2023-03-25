import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Home from '../screens/Home';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';

export type MainStack = {
  Home: undefined;
  Otp: undefined;
};

const MainStack = createNativeStackNavigator<MainStack>();

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
      
    </MainStack.Navigator>
  );
};

export default Auth;
