import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import PrimaryTheme from '../theme/Primary';
import SplashScreen from '../screens/SplashScreen';
import Auth from './AuthStack';

const Navigation = () => {
  const [initialLoading, setInitialLoading] = React.useState<boolean>(true);
  const [userToken, setUserToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const token = await EncryptedStorage.getItem('token');
      if (token) {
        setUserToken(token);
      }
      setInitialLoading(false);
    })();
  }, []);

  return (
    <NavigationContainer theme={PrimaryTheme}>
      {initialLoading ? <SplashScreen /> : <Auth />}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
