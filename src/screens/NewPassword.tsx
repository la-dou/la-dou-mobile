import {StyleSheet, View, Alert} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/AuthStack';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';
import {resetPassword} from '../api/Auth';

type NewPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'NewPassword'
>;

const NewPassword: React.FC<NewPasswordProps> = ({navigation, route}) => {
  const {colors} = useTheme();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setconfirmPassword] = React.useState('');

  const handleSubmit = async () => {
    if (newPassword === confirmPassword) {
      if (newPassword.length < 8) {
        Alert.alert('Password must be at least 8 characters');
        return;
      }
      //add validation for empty fields, password length, etc
      try {
        const res = await resetPassword(
          route.params.rollNumber,
          newPassword,
          route.params.token,
        );
        console.log(res);
        Alert.alert(
          'Password Updated!',
          res
            ? res.detail
            : 'Your password has been successfully updated. Please proceed to login!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ],
        );
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Error!',
          'There was an error updating your password. Please try again!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ],
        );
      }
    } else {
      Alert.alert('Password does not match');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          Create New Password
        </HrText>
        <AppTextInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <AppTextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setconfirmPassword}
          secureTextEntry
        />

        <AppButton primary onPress={handleSubmit}>
          Finish
        </AppButton>
      </View>
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  logoContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
