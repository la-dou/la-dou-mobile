import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Navigation';
import Check from '../components/check';

type OtpProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const Otp: React.FC<OtpProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [verifiedMobile, setVerifiedMobile] = React.useState(false);
  const [verifiedEmail, setVerifiedEmail] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={24} />
      </View>
      <View style={styles.formContainer}>
        <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
          Otp
        </HrText>

        {/* text box for email and number */}
        <View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Light',
              fontStyle: 'normal',
              fontWeight: '300',
              lineHeight: 17,
              textAlign: 'center',
              color: colors.primary,
              width: 155,
            }}>
            Code has been sent to +92 303 22 33 203 and email@lums.edu.pk
          </Text>
        </View>

        {/* flex box: row for mobile and verify button */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <AppTextInput
              placeholder="Mobile"
              value={mobile}
              onChangeText={setMobile}
              maxLength={8}
              keyboardType="numeric"
              // dynamicWidth="45%"
            />
          </View>
          <View
            style={{
              flex: 0.8,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {verifiedMobile ? (
              <Check size={40} />
            ) : (
              <AppButton primary onPress={() => setVerifiedMobile(true)}>
                Verify
              </AppButton>
            )}
          </View>
        </View>

        {/* flex box: row for email and verify button */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              maxLength={8}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flex: 0.8,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {verifiedEmail ? (
              <Check size={40} />
            ) : (
              <AppButton primary onPress={() => setVerifiedEmail(true)}>
                Verify
              </AppButton>
            )}
          </View>
        </View>
        <AppButton primary opacity onPress={() => navigation.replace('Signup')}>
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
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Otp;
