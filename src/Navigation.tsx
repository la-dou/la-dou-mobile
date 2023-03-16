import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F7EBE8',
    background: '#1E1E1E',
    card: '#262626',
    text: '#CB4B47',
    border: '#591028',
  },
};

const Navigation = () => {
  const [initialLoading, setInitialLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      {initialLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
