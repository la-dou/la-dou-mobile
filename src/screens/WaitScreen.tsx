import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React from 'react';
import {MainStackParamList} from '../navigation/MainStack';
import PrimaryTheme from '../theme/Primary';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {getOrderStatusDriver} from '../api/Jobs';

type WaitScreenProps = NativeStackScreenProps<MainStackParamList, 'WaitScreen'>;
const WaitScreen: React.FC<WaitScreenProps> = ({navigation, route}) => {

  let {order_id} = route.params;

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getOrderStatusDriver(order_id);
        if (data.status === 'picking') {
          navigation.replace('DriverProgress', {order_id: order_id});
        }
        else if (data.status === 'denied') {
          Alert.alert("Your bid was rejected by the customer.");
          navigation.replace("Home");
        }
        else if (data.status === 'cancelled') {
          Alert.alert("The customer cancelled the order.");
          navigation.replace("Home");
        }
      } catch (err) {
        console.log(err);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: 300,
          height: 180,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../assets/images/logo-waiting.png')}
          style={{width: 100, height: 100}}
        />

        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Montserrat-bold',
              fontWeight: '600',
              color: PrimaryTheme.colors.primary,
              lineHeight: 24,
            }}>
            Waiting for the Customer
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Montserrat-bold',
              fontWeight: '600',
              color: PrimaryTheme.colors.primary,
              lineHeight: 24,
            }}>
            to make a decision...
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WaitScreen;
