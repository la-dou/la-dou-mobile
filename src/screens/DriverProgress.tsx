import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainStack';

type DriverProgressProps = NativeStackScreenProps<MainStackParamList, 'DriverProgress'>;

const DriverProgress: React.FC<DriverProgressProps> = ({navigation}) => {
  return (
    <View>
      <Text>DriverProgress</Text>
    </View>
  )
}

export default DriverProgress

const styles = StyleSheet.create({})