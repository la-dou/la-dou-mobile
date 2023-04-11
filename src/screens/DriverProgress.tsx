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

import PrimaryTheme from '../theme/Primary';
import AppButton from '../components/Button';
import {MainStackParamList} from '../navigation/MainStack';
import {cancelInProgressOrder, getInProgressOrderStatus, updateInProgressOrderStatus} from '../api/Jobs';

type OrderStatus = {
  orderFrom: string;
  orderTo: string;
  orderStatus: string;
};

type DriverProgressProps = NativeStackScreenProps<
  MainStackParamList,
  'DriverProgress'
>;

const DriverProgress: React.FC<DriverProgressProps> = ({navigation, route}) => {
  const {colors} = useTheme();

  let {order_id} = route.params;

  const [orderFrom, setOrderFrom] = React.useState('');
  const [orderTo, setOrderTo] = React.useState('');

  const [orderPickedUp, setOrderPickedUp] = React.useState(false);
  const [orderArrived, setOrderArrived] = React.useState(false);
  const [orderDelivered, setOrderDelivered] = React.useState(false);
  const [customerRollNo, setCustomerRollNo] = React.useState<Number>();

  React.useEffect(() => {
    const loadOrderInfo = async () => {
      try {
        const data = await getInProgressOrderStatus();

        // TODO: @soomro, add the api call here to get the order info. This includes the orderFrom and orderTo, and the order status. set the order status to the respective state variables.
        setOrderFrom(data.deliver_from);
        setOrderTo(data.deliver_to);
        setOrderPickedUp(data.status === 'picked');
        setOrderArrived(data.status === 'arrived');
        setOrderDelivered(data.status === 'delivered');
        setCustomerRollNo(data.assigned_to);
      } catch (error) {
        console.log(error);
      }
    };
    loadOrderInfo();
  }, []);

  // TODO: Please populate the following functions to update the order status. these are called when the user clicks on the buttons.
  const UpdateOrderPickedUp = async (status: boolean) => {
    try {
      if (status) {
        const data = await updateInProgressOrderStatus('picked');
      }
      setOrderPickedUp(status);
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateOrderArrived = async (status: boolean) => {
    try {
      if (status) {
        const data = await updateInProgressOrderStatus('arrived');
      }
      setOrderArrived(status);
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateOrderDelivered = async (status: boolean) => {
    try {
      if (status) {
        const data = await updateInProgressOrderStatus('delivered');
      }
      setOrderDelivered(status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* text box for email and number */}
        <Text style={styles.titleText}>{orderFrom}</Text>
        <Text style={styles.titleText}>to</Text>
        <Text style={styles.titleText}>{orderTo}</Text>

        {/* flex box: row for mobile and verify button */}
        {true && (
          <View style={styles.verificationContainer}>
            <Text style={styles.otpInputContainer}>Picked-up</Text>
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
            <Text style={styles.otpInputContainer}>Arrived</Text>
            <View style={styles.buttonCheckMarkContainer}>
              {!orderPickedUp ? (
                <Text style={styles.pendingEllipsis}>...</Text>
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
            <Text style={styles.otpInputContainer}>Delivered</Text>
            <View style={styles.buttonCheckMarkContainer}>
              {!orderArrived ? (
                <Text style={styles.pendingEllipsis}>...</Text>
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
            customerRollNo ? 
            navigation.navigate('Chat', {guest_roll_no: customerRollNo}) : null;
          }}>
          Contact Customer
        </AppButton>
        <AppButton
          inactive={orderPickedUp}
          onPress={async () => {
            try {
              const data = await cancelInProgressOrder();
              Alert.alert('Cancel Order');
            } catch (error) {
              console.log(error);
              Alert.alert('Error', 'Could not cancel order');
            }
          }}>
          Cancel Order
        </AppButton>
      </View>
    </View>
  );
};

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
