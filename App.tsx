/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  PermissionsAndroid,
} from 'react-native';

import Navigation from './src/navigation/Navigation';
import {RecoilRoot} from 'recoil';
import PrimaryTheme from './src/theme/Primary';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: PrimaryTheme.colors.background,
    flex: 1,
  };

  React.useEffect(() => {
    requestUserPermission();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <RecoilRoot>
        <StatusBar
          // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={
            isDarkMode ? PrimaryTheme.colors.background : '#ffffff'
          }
        />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* <ScrollView keyboardShouldPersistTaps="handled"> */}
          <Navigation />
          {/* </ScrollView> */}
        </KeyboardAvoidingView>
      </RecoilRoot>
    </SafeAreaView>
  );
}

export default App;
