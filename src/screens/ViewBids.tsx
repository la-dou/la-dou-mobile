import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';

import AppButton from '../components/Button';
import Card from '../components/Card';
import HrText from '../components/HrText';

const bids = [
  {
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },
  {
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },
  {
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },
  {
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },{
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },
  {
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },{
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },
  {
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },{
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },
  {
    name: 'Saad Mehmoon',
    bid: 'Rs. 500',
  },  
]

const ViewBids = () => {
  const {colors} = useTheme();
  const onSubmit = () => {};
  return (
    <View style={styles.container}>
      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>Bids</HrText>
      <ScrollView>
        {bids.map((bid, index) => (
          <Card key={index} onSubmitHandler={onSubmit} children={2} data={bid}  />
        ))}
      </ScrollView>
      <AppButton primary > Cancel Order </AppButton>
    </View>
  )
}

export default ViewBids

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '30%',
    padding: 30,
    alignItems: 'center',
  }
})