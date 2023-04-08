import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';

import AppButton from '../components/Button';

const ViewBids = () => {
  return (
    <View>
      <Text>ViewBids</Text>
      <AppButton primary > Cancel Order </AppButton>
    </View>
  )
}

export default ViewBids

const styles = StyleSheet.create({})