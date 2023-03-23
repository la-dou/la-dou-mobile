/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
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
          // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={
            isDarkMode ? PrimaryTheme.colors.background : '#ffffff'
          }
        />
        <Navigation />
      </RecoilRoot>
    </SafeAreaView>
  );
}

export default App;
