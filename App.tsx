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
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';

import Navigation from './src/navigation/Navigation';
import {RecoilRoot} from 'recoil';
import PrimaryTheme from './src/theme/Primary';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: PrimaryTheme.colors.background,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <RecoilRoot>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={
            isDarkMode ? PrimaryTheme.colors.background : '#ffffff'
          }
        />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1}}>
              <Navigation />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </RecoilRoot>
    </SafeAreaView>
  );
}

export default App;
