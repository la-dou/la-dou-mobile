import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Home from '../screens/Home';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Otp from '../screens/Otp';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Rating from '../screens/Rating';
import PlaceOrder from '../screens/PlaceOrder'

export type MainStackParamList = {
  Home: undefined;
  Otp: {
    rollNumber: Number;
    path: string;
    phone_verified?: boolean;
    email_verified?: boolean;
  };
  Profile: undefined;
  Search: undefined;
  Rating: {
    driver_roll_number: Number;
  };
  PlaceOrder: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNav = () => {
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
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="Search" component={Search} />
      <MainStack.Screen name="Rating" component={Rating} />
      {/* navigation.navigate('Rating', {driver_roll_number: 24100043}); */}
      <MainStack.Screen name="PlaceOrder" component={PlaceOrder} />
    </MainStack.Navigator>
  );
};

export default MainNav;
