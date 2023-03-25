import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useRecoilState} from 'recoil';

import {authToken as authTokenAtom} from '../atoms';
import PrimaryTheme from '../theme/Primary';
import SplashScreen from '../screens/SplashScreen';
import Auth from './AuthStack';
import UserDriverStack from './UserDriverStack';

const Navigation = () => {
  const [initialLoading, setInitialLoading] = React.useState<boolean>(true);
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  React.useEffect(() => {
    const retrieveToken = async () => {
      try {
        const token = await EncryptedStorage.getItem('token');
        if (token) {
          setAuthToken(token);
        }
      } catch (error) {
        console.log(error);
      }
      setInitialLoading(false);
    };

    retrieveToken();
  }, []);

  React.useEffect(() => {
    if (authToken) {
      EncryptedStorage.setItem('token', authToken);
    } else {
      EncryptedStorage.removeItem('token');
    }
    console.log(authToken)
  }, [authToken])

  return (
    <NavigationContainer theme={PrimaryTheme}>
      {initialLoading ? (
        <SplashScreen />
      ) : authToken ? (
        <UserDriverStack />
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
