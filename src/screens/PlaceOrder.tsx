import {StyleSheet, Alert, View, ScrollView} from 'react-native';
import React from 'react';
import {useRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';
import {postJob} from '../api/Jobs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainStack';
import {inProgressOrderId as inProgressOrderIdState} from '../atoms';

type PlaceOrderProps = NativeStackScreenProps<MainStackParamList, 'PlaceOrder'>;

const PlaceOrder: React.FC<PlaceOrderProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const [deliveryPrice, setDeliveryPrice] = React.useState('');
  const [cashToBePaid, setCashToBePaid] = React.useState('');
  const [deliveryNote, setDeliveryNote] = React.useState('');
  const [inProgressOrderId, setInProgressOrderId] = useRecoilState(
    inProgressOrderIdState,
  );

  const handleSubmit = async () => {
    //add validation for empty fields
    if (!pickup) {
      Alert.alert('Please enter your pickup location');
      return;
    }
    if (!dropoff) {
      Alert.alert('Please enter your dropoff location');
      return;
    }
    if (!deliveryPrice) {
      Alert.alert('Please enter your delivery price');
      return;
    }
    if (!cashToBePaid) {
      Alert.alert('Please enter your cash to be paid');
      return;
    }

    // add validation for delivery price and cash to be paid. convert to number and check if it is a number
    if (isNaN(Number(deliveryPrice)) || Number(deliveryPrice) < 0) {
      Alert.alert('Please enter a valid delivery price');
      return;
    }

    if (isNaN(Number(cashToBePaid)) || Number(cashToBePaid) < 0) {
      Alert.alert('Please enter a valid amount to pay.');
      return;
    }

    if (Number(cashToBePaid) < Number(deliveryPrice)) {
      Alert.alert('Cash to be paid cannot be less than delivery price');
      return;
    }

    try {
      const data = await postJob(
        pickup,
        dropoff,
        deliveryPrice,
        cashToBePaid,
        deliveryNote,
      );
      console.log(data);
      setInProgressOrderId(data.id);
      Alert.alert('Order posted successfully!', '', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ViewBids'),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Error posting order!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
            Place Order
          </HrText>
          <AppTextInput
            placeholder="Pickup"
            value={pickup}
            onChangeText={setPickup}
          />
          <AppTextInput
            placeholder="Dropoff"
            value={dropoff}
            onChangeText={setDropoff}
          />
          <AppTextInput
            placeholder="Delivery Price"
            value={deliveryPrice}
            onChangeText={setDeliveryPrice}
            keyboardType="phone-pad"
            maxLength={6}
          />
          <AppTextInput
            placeholder="Cash to be paid"
            value={cashToBePaid}
            onChangeText={setCashToBePaid}
            keyboardType="phone-pad"
            maxLength={6}
          />
          <AppTextInput
            placeholder="Additional Notes (if any)"
            value={deliveryNote}
            onChangeText={setDeliveryNote}
            containerStyle={styles.lastTextBox}
          />

          <AppButton primary onPress={handleSubmit}>
            Post Order
          </AppButton>
        </ScrollView>
      </View>
    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  innerContainer: {
    width: '100%',
  },
  scrollContainer: {
    width: '100%',
  },
  lastTextBox: {
    marginBottom: 20,
  },
});
