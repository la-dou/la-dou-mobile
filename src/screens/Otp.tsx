import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../navigation/AuthStack';
import {sendEmailOtp, verifyEmailOtp} from '../api/Otp';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';
import {MainStackParamList} from '../navigation/MainStack';

type OtpProps = NativeStackScreenProps<AuthStackParamList, 'Otp'> &
  NativeStackScreenProps<MainStackParamList, 'Otp'>;

const Otp: React.FC<OtpProps> = ({navigation, route}) => {
  const {colors} = useTheme();
  const [phoneOTP, setPhoneOTP] = React.useState('');
  const [emailOTP, setEmailOTP] = React.useState('');
  const [phoneSent, setPhoneSent] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [phoneLoading, setPhoneLoading] = React.useState(false);
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [phoneVerified, setPhoneVerified] = React.useState(false);
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [verificationToken, setVerificationToken] = React.useState('');
  // removing the phone_verified check for now. Uncomment the following line to add the check
  const verificationDone = route.params.email_verified || emailVerified;
  // && (route.params.phone_verified || phoneVerified);

  const handleSendEmailOtp = async () => {
    setEmailLoading(true);
    try {
      const res = await sendEmailOtp(route.params.rollNumber);
      if (res.status === 200) {
        setEmailSent(true);
      }
    } catch (err) {
      console.log(err);
    }
    setEmailLoading(false);
  };

  const handleVerifyEmailOtp = async () => {
    setEmailLoading(true);
    try {
      const res = await verifyEmailOtp(
        route.params.rollNumber,
        Number(emailOTP),
      );
      if (res.status === 200 && res.data) {
        setEmailVerified(true);
        setVerificationToken(res.data.token);
      }
      // else if (res.status === 400) {
      //   Alert.alert(
      //     'Incorrect OTP',
      //     'The OTP you entered is incorrect. Please try again.',
      //   );
      //   setEmailSent(false);
      // }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      setEmailSent(false);
    }
    setEmailLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24 * 6} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          OTP
        </HrText>

        {/* text box for email and number */}
        <Text style={[styles.codeSentText, {color: colors.primary}]}>
          {`OTP will been sent to your registered phone number and \n${route.params.rollNumber}@lums.edu.pk`}
        </Text>

        {/* flex box: row for mobile and verify button */}
        {!route.params.phone_verified && route.params.path !== 'ForgetPassword' && (
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
              {phoneLoading ? (
                <ActivityIndicator
                  size={24}
                  color={colors.primary}
                  style={styles.checkMark}
                />
              ) : phoneVerified ? (
                <Image
                  style={styles.checkMark}
                  source={require('../assets/images/checkMark.png')}
                />
              ) : (
                <AppButton
                  primary
                  onPress={() => {
                    phoneSent ? setPhoneVerified(true) : null;
                  }}>
                  {phoneSent ? 'Verify' : 'Send'}
                </AppButton>
              )}
            </View>
          </View>
        )}

        {/* flex box: row for email and verify button */}
        {!route.params.email_verified && (
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
              {emailLoading ? (
                <ActivityIndicator
                  size={24}
                  color={colors.primary}
                  style={styles.checkMark}
                />
              ) : emailVerified ? (
                <Image
                  style={styles.checkMark}
                  source={require('../assets/images/checkMark.png')}
                />
              ) : (
                <AppButton
                  primary
                  onPress={() =>
                    emailSent ? handleVerifyEmailOtp() : handleSendEmailOtp()
                  }>
                  {emailSent ? 'Verify' : 'Send'}
                </AppButton>
              )}
            </View>
          </View>
        )}

        <AppButton
          primary
          inactive={!verificationDone}
          onPress={() => {
            if (verificationDone) {
              if (route.params.path === 'signup') {
                navigation.replace('Login'); //coming from signup screen to otp
              } else if (route.params.path === 'Home') {
                navigation.replace('Home'); // coming from home screen to otp
              } else {
                navigation.navigate('NewPassword', {
                  rollNumber: route.params.rollNumber,
                  token: verificationToken,
                }); // otherwise coming from forgetpassword, continue to new password screen
              }
            }
          }}>
          {route.params.path === 'signup' ? 'Finish' : 'Continue'}
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
    resizeMode: 'contain',
  },
});

export default Otp;
