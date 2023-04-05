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
import PlaceOrder from '../screens/PlaceOrder';
import OrderHistory from '../screens/OrderHistory';
import UserDetails from '../screens/UserDetails';
import ViewBids from '../screens/ViewBids';
import PlaceBids from '../screens/PlaceBids';
import WaitScreen from '../screens/WaitScreen';
import Chat from '../screens/Chat';

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
  OrderHistory: undefined;
  UserDetails: {
    userDetails: {
      amount_as_customer: Number;
      amount_as_driver: Number;
      count_as_customer: Number;
      count_as_driver: Number;
      deactivated_customer: boolean;
      deactivated_driver: boolean;
      name: string;
      phone_number: string;
      rating_as_customer: string;
      rating_as_driver: string;
      roll_no: Number;
    };
  };
  ViewBids: undefined;
  PlaceBids: undefined;
  WaitScreen: undefined;
  Chat: undefined
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
      <MainStack.Screen name="OrderHistory" component={OrderHistory} />
      <MainStack.Screen name="UserDetails" component={UserDetails} />
      <MainStack.Screen name='ViewBids' component={ViewBids} />
      <MainStack.Screen name='PlaceBids' component={PlaceBids} />
      <MainStack.Screen name='WaitScreen' component={WaitScreen} />
      <MainStack.Screen name="Chat" component={Chat} options={{headerShown: false}} />
    </MainStack.Navigator>
  );
};

export default MainNav;
