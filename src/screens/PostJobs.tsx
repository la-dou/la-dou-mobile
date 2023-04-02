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

  const handleSubmit = async () => {
    //add validation for empty fields, password length, etc
    if (!oldPassword) {
      Alert.alert('Please enter your old password');
      return;
    }
    if (newPassword.length < 8 && newPassword.length > 0) {
      Alert.alert('Password must be at least 8 characters');
      return;
    }
    if (phoneNumber.length !== 11) {
      Alert.alert('Please enter a valid phone number');
      return;
    }
    if (phoneNumber !== userDetails.phone_number) {
      try {
        const res = await updatePhone(oldPassword, phoneNumber);
        console.log(res);
        setUserDetails({...userDetails, phone_number: phoneNumber});
        Alert.alert('Phone number updated successfully!');
      } catch (err) {
        console.log(err);
        Alert.alert('Error updating phone number!');
      }
    }
    if (newPassword !== '') {
      try {
        const res = await updatePassword(oldPassword, newPassword);
        console.log(res);
        Alert.alert('Password updated successfully!');
      } catch (err) {
        console.log(err);
        Alert.alert('Error updating password!');
      }
    }

    console.log('submit');
  };

  return (
    <View style={styles.container}>
      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        Place Order
      </HrText>
      <AppTextInput
        placeholder="Pickup"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <AppTextInput
        placeholder="Dropoff"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <AppTextInput
        placeholder="Delivery Price"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        // maxLength={11}
      />
      <AppTextInput
        placeholder="Cash to be paid"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        // maxLength={11}
      />
      <AppTextInput
        placeholder="Additional Notes (if any)"
        value={newPassword}
        onChangeText={setNewPassword}
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