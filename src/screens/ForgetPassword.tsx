import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/AuthStack';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';

type ForgetPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgetPassword'
>;

const ForgetPassword: React.FC<ForgetPasswordProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [rollNumber, setRollNumber] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24 * 6} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          Forget Password
        </HrText>
        <AppTextInput
          placeholder="Roll Number"
          value={rollNumber}
          onChangeText={setRollNumber}
          maxLength={8}
          keyboardType="numeric"
        />

        <AppButton
          primary
          onPress={() =>
            navigation.navigate('Otp', {
              rollNumber: Number(rollNumber),
              path: 'ForgetPassword', // forget password to otp gives continue btn
            })
          }>
          Continue
        </AppButton>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
