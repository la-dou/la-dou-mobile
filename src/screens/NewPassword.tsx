import {StyleSheet, View, Alert} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/AuthStack';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';

type NewPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'NewPassword'
>;

const NewPassword: React.FC<NewPasswordProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setconfirmPassword] = React.useState('');

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

        <AppButton
          primary
          onPress={() => {
            if (newPassword === confirmPassword) {
              //add validation for empty fields, password length, etc
              //navigation.replace('Login'); //TODO: replace it with home screen
              Alert.alert('Password changed successfully');
            } else {
              Alert.alert('Password does not match');
            }
          }}>
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
