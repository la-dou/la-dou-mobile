import React from 'react';
import {StyleSheet, View} from 'react-native';

import Logo from '../components/Logo';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo size={24} noBackground />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
