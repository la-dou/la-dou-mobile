import {StyleSheet, Alert, View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import AppButton from '../components/Button';
import { getOrderStatus, updateOrderStatus } from '../api/orderStatus';
import Card from '../components/Card';
import {sendDriverRating} from '../api/Rating';
import PrimaryTheme from '../theme/Primary';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainStack';

const MiddleSection = ( {current_status, driver_name} ) => {
  
  if (current_status === 'picking') {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>{driver_name} is on the way to pick up your order.</Text>
      </View>
    );
  }
  else if (current_status === 'orderPicked') {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>{driver_name} has picked up your order. They are on their way to you.</Text>
      </View>
    );
  }
  else if (current_status === 'orderArrived') {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>Your order is here. Please receive it.</Text>
      </View>
    );
  }
  else if (current_status === 'done' || current_status === 'delivery_success')
  {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>Your order was successfully delivered. Thank you for using La-dou.
        </Text>
      </View>
    );
  }
  else if (current_status === 'null')
  {  
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>No Orders Yet.</Text>
      </View>
    );
  }
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyles}>Waiting on confirmation. The order is pending.</Text>
    </View>
  );
};

const BottomSection = ({current_status, driver_roll_no}) => {

  if (current_status === 'picking') {
    return (
      <>
        <AppButton primary onPress={() => {
        Alert.alert('Error', 'This feature is not yet available');
        // TODO implement this
      }}>
          Contact Driver
        </AppButton>
        <AppButton onPress={ async () => {
          try{
            const res = await updateOrderStatus("cancelled");
            Alert.alert('Success', 'Order cancelled');
          } catch (e) {
            Alert.alert('Error', 'Something went wrong');
          }
        } }>
          Cancel Order
        </AppButton>
      </>
    );
  }
  else if (current_status === 'delivery_success') {
    return (
      <>
        <Card
          onSubmitHandler={async (rating: any) => {
            try 
            {
              const res = await sendDriverRating(driver_roll_no, rating);
              Alert.alert('Success', 'Rating submitted');

              //TODO:  handle next step
              await updateOrderStatus("done");
            } 
            catch (e) 
            {
              // console.log(e);
              Alert.alert('Error', 'Something went wrong');

              //TODO:  handle next step
            }
          }}
          children={0}
        />
      </>
    );
  }
  else if (current_status === 'done')
  {
    return (
      <>
        <Text style={{color: 'white', fontSize: 28}}>Thank you for your feedback.</Text>
      </>
    );
  }
  else if (current_status === 'pending' || current_status === 'null' || !current_status)
  {
    return (
      <>
        <Text style={{color: 'white', fontSize: 28}}></Text>
      </>
    );
  }
  else return (
    <>
      <AppButton primary onPress={() => {
        Alert.alert('Error', 'This feature is not yet available');
        // TODO implement this
      }}>
        Contact Driver
      </AppButton>
    </>
  );
};

const AcceptBid = () => {
  const {colors} = useTheme();
  const [current_status, setCurrentStatus] = React.useState('null');
  const [driver_name, setDriverName] = React.useState('null');
  const [driver_roll, setDriverRoll] = React.useState('null');

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await getOrderStatus();
        setCurrentStatus(res.order_status);
        setDriverName(res.driver_name);
        setDriverRoll(res.driver_roll_no);

        console.log(res);
      } catch (e) {
        // console.log(e);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MiddleSection current_status={current_status} driver_name={driver_name}/>
      <BottomSection current_status={current_status} driver_roll_no={driver_roll}/>
    </View>
  );
};

export default AcceptBid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
  lastTextBox: {
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    fontSize: 20,
    color: PrimaryTheme.colors.primary,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
  }
});


// current_status === 'picking'
// current_status === 'orderPicked'
// current_status === 'orderArrived'
// current_status === 'done'