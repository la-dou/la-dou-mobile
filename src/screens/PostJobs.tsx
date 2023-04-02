import {StyleSheet, Alert, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';
import {userDetails as userDetailsAtom} from '../atoms';
import {updatePhone, updatePassword} from '../api/User';

const PostJobs = () => {
  const {colors} = useTheme();
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
  const [phoneNumber, setPhoneNumber] = React.useState(
    userDetails.phone_number,
  );
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const [deliveryPrice, setDeliveryPrice] = React.useState('');
  const [cashToBePaid, setCashToBePaid] = React.useState('');
  const [deliveryNote, setDeliveryNote] = React.useState('');

  const handleSubmit = async () => {
    //add validation for empty fields
    if (!pickup)
    {
      Alert.alert('Please enter your pickup location');
      return;
    }
    if (!dropoff)
    {
      Alert.alert('Please enter your dropoff location');
      return;
    }
    if (!deliveryPrice)
    {
      Alert.alert('Please enter your delivery price');
      return;
    }
    if (!cashToBePaid)
    {
      Alert.alert('Please enter your cash to be paid');
      return;
    }

    // add validation for delivery price and cash to be paid. convert to number and check if it is a number
    if (isNaN(Number(deliveryPrice)))
    {
      Alert.alert('Please enter a valid delivery price');
      return;
    }

    if (isNaN(Number(cashToBePaid)))
    {
      Alert.alert('Please enter a valid amount to pay.');
      return;
    }

    // if (!oldPassword) {
    //   Alert.alert('Please enter your old password');
    //   return;
    // }
    // if (newPassword.length < 8 && newPassword.length > 0) {
    //   Alert.alert('Password must be at least 8 characters');
    //   return;
    // }
    // if (phoneNumber.length !== 11) {
    //   Alert.alert('Please enter a valid phone number');
    //   return;
    // }
    // if (phoneNumber !== userDetails.phone_number) {
    //   try {
    //     const res = await updatePhone(oldPassword, phoneNumber);
    //     console.log(res);
    //     setUserDetails({...userDetails, phone_number: phoneNumber});
    //     Alert.alert('Phone number updated successfully!');
    //   } catch (err) {
    //     console.log(err);
    //     Alert.alert('Error updating phone number!');
    //   }
    // }
    // if (newPassword !== '') {
    //   try {
    //     const res = await updatePassword(oldPassword, newPassword);
    //     console.log(res);
    //     Alert.alert('Password updated successfully!');
    //   } catch (err) {
    //     console.log(err);
    //     Alert.alert('Error updating password!');
    //   }
    // }

    console.log('Post Order Pressed');
  };

  return (
    <View style={styles.container}>
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
        // maxLength={11}
      />
      <AppTextInput
        placeholder="Cash to be paid"
        value={cashToBePaid}
        onChangeText={setCashToBePaid}
        keyboardType="phone-pad"
        // maxLength={11}
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
    </View>
  );
};

export default PostJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
  lastTextBox: {
    marginBottom: 20,
  },
});