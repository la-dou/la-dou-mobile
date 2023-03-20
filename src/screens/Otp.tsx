import {StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../navigation/AuthStack';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';

type OtpProps = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

const Otp: React.FC<OtpProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [phoneOTP, setPhoneOTP] = React.useState('');
  const [emailOTP, setEmailOTP] = React.useState('');
  const [phoneVerified, setPhoneVerified] = React.useState(false);
  const [emailVerified, setEmailVerified] = React.useState(false);
  const verificationDone = phoneVerified && emailVerified;
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          OTP
        </HrText>

        {/* text box for email and number */}
        <Text style={[styles.codeSentText, {color: colors.primary}]}>
          OTP has been sent to +92-300-2643634 and 24100116@lums.edu.pk
        </Text>

        {/* flex box: row for mobile and verify button */}
        <View style={styles.verificationContainer}>
          <AppTextInput
            placeholder="Mobile"
            value={phoneOTP}
            onChangeText={setPhoneOTP}
            maxLength={4}
            keyboardType="numeric"
            containerStyle={styles.otpInputContainer}
          />
          <View style={styles.buttonCheckMarkContainer}>
            {phoneVerified ? (
              <Image
                style={styles.checkMark}
                source={require('../assets/images/checkMark.png')}
              />
            ) : (
              <AppButton primary onPress={() => setPhoneVerified(true)}>
                Verify
              </AppButton>
            )}
          </View>
        </View>

        {/* flex box: row for email and verify button */}
        <View style={styles.verificationContainer}>
          <AppTextInput
            placeholder="Email"
            value={emailOTP}
            onChangeText={setEmailOTP}
            maxLength={4}
            keyboardType="numeric"
            containerStyle={styles.otpInputContainer}
          />
          <View style={styles.buttonCheckMarkContainer}>
            {emailVerified ? (
              <Image
                style={styles.checkMark}
                source={require('../assets/images/checkMark.png')}
              />
            ) : (
              <AppButton primary onPress={() => setEmailVerified(true)}>
                Verify
              </AppButton>
            )}
          </View>
        </View>
        <AppButton
          primary
          inactive={!verificationDone}
          onPress={() => verificationDone && navigation.replace('Signup')}>
          Finish
        </AppButton>
      </View>
    </View>
  );
};

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
  codeSentText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 17,
    textAlign: 'center',
    marginVertical: 10,
    width: '55%',
  },
  verificationContainer: {
    flexDirection: 'row',
  },
  otpInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  buttonCheckMarkContainer: {
    flex: 0.8,
    padding: 10,
    alignItems: 'center',
  },
  checkMark: {
    width: 28,
    height: 28,
    marginVertical: 15,
  },
});

export default Otp;
