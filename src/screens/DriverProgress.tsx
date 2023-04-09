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
import PrimaryTheme from '../theme/Primary';
import {sendEmailOtp, verifyEmailOtp} from '../api/Otp';
import Logo from '../components/Logo';
import HrText from '../components/HrText';
import AppButton from '../components/Button';
import AppTextInput from '../components/AppTextInput';
import {MainStackParamList} from '../navigation/MainStack';

type DriverProgressProps = NativeStackScreenProps<MainStackParamList, 'DriverProgress'>;

const DriverProgress: React.FC<DriverProgressProps> = ({navigation}) => 
{
  const [orderFrom, setOrderFrom] = React.useState('');
  const [orderTo, setOrderTo] = React.useState('');

  const [orderPickedUp, setOrderPickedUp] = React.useState(false);
  const [orderArrived, setOrderArrived] = React.useState(false);
  const [orderDelivered, setOrderDelivered] = React.useState(false);

  React.useEffect(() => {
    const loadOrderInfo = async () => {
      // TODO: @soomro, add the api call here to get the order info. This includes the orderFrom and orderTo, and the order status. set the order status to the respective state variables.
      setOrderFrom('Ingate');
      setOrderTo('Aquatic Center');
    };
    loadOrderInfo();
  }, []);

  // TODO: Please populate the following functions to update the order status. these are called when the user clicks on the buttons.
  const UpdateOrderPickedUp = async (status: boolean) => {setOrderPickedUp(status)};
  const UpdateOrderArrived = async (status: boolean) => {setOrderArrived(status)};
  const UpdateOrderDelivered = async (status: boolean) => {setOrderDelivered(status)};

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* text box for email and number */}
        <Text style={styles.titleText}>
          {orderFrom}
        </Text>
        <Text style={styles.titleText}>
          to
        </Text>
        <Text style={styles.titleText}>
          {orderTo}
        </Text>

        {/* flex box: row for mobile and verify button */}
        {true && (
          <View style={styles.verificationContainer}>
            <Text style={styles.otpInputContainer}>
              Picked-up
            </Text>
            <View style={styles.buttonCheckMarkContainer}>
              {orderPickedUp ? (
                <Image
                  style={styles.checkMark}
                  source={require('../assets/images/checkMark.png')}
                />
              ) : (
                <AppButton
                  primary
                  onPress={() => {
                    !orderPickedUp ? UpdateOrderPickedUp(true) : null;
                  }}>
                  Update
                </AppButton>
              )}
            </View>
          </View>
        )}

        {/* flex box: row for email and verify button */}
        {true && (
          <View style={styles.verificationContainer}>
            <Text style={styles.otpInputContainer}>
              Arrived
            </Text>
            <View style={styles.buttonCheckMarkContainer}>
              {!orderPickedUp ? (
                <Text style={styles.pendingEllipsis}>
                  ...
                </Text>
              ) : orderArrived ? (
                <Image
                  style={styles.checkMark}
                  source={require('../assets/images/checkMark.png')}
                />
              ) : (
                <AppButton
                  primary
                  onPress={() =>
                    !orderArrived ? UpdateOrderArrived(true) : null
                  }>
                  Update
                </AppButton>
              )}
            </View>
          </View>
        )}
        {/* flex box: row for email and verify button */}
        {true && (
          <View style={styles.verificationContainer}>
            <Text style={styles.otpInputContainer}>
              Delivered
            </Text>
            <View style={styles.buttonCheckMarkContainer}>
              {!orderArrived ? (
                <Text style={styles.pendingEllipsis}>
                 ...
               </Text>
              ) : orderDelivered ? (
                <Image
                  style={styles.checkMark}
                  source={require('../assets/images/checkMark.png')}
                />
              ) : (
                <AppButton
                  primary
                  onPress={() =>
                    !orderDelivered ? UpdateOrderDelivered(true) : null
                  }>
                  Update
                </AppButton>
              )}
            </View>
          </View>
        )}
        <AppButton
          primary
          onPress={() => {
            Alert.alert('Contact Customer');
          }}>
          Contact Customer
        </AppButton>
        <AppButton
          inactive={orderPickedUp}
          onPress={() => {
            Alert.alert('Cancel Order');
          }}>
          Cancel Order
        </AppButton>
      </View>
    </View>
  )
}

export default DriverProgress;

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
    marginTop: 25,
    fontSize: 20,
    color: PrimaryTheme.colors.primary,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
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
  titleText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 29,
    textAlign: 'center',
    color: PrimaryTheme.colors.primary,
    marginVertical: 10,
  },
  pendingEllipsis: {
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 29,
    textAlign: 'center',
    color: PrimaryTheme.colors.primary,
    marginVertical: 10,
  },
});