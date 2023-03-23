import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Logo from '../components/Logo';

import PrimaryTheme from '../theme/Primary';
import MenuButton from '../components/MenuButton';

const Home = () => {
  return (
    <View style={styles.continaer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Hi there,{'\n'}Saad</Text>
      </View>
      <View style={styles.menuContainer}>
        <MenuButton
          primary
          iconSource={require('../assets/images/cart-icon.png')}
          text="Place Order"
        />
        <MenuButton
          primary
          iconSource={require('../assets/images/switch-icon.png')}
          text="Switch to Driver"
        />
        <MenuButton
          iconSource={require('../assets/images/history-icon.png')}
          text="History"
        />
        <MenuButton
          iconSource={require('../assets/images/profile-icon.png')}
          text="Profile"
        />
        <MenuButton
          iconSource={require('../assets/images/logout-icon.png')}
          text="Logout"
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  continaer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  greetingContainer: {
    flex: 0.45,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  greeting: {
    fontFamily: 'Montserrat-Medium',
    color: PrimaryTheme.colors.primary,
    fontSize: 48,
    lineHeight: 48,
  },
  menuContainer: {
    flex: 1.55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
