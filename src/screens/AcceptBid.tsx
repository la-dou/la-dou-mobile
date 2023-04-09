import {StyleSheet, Alert, View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import AppButton from '../components/Button';
import { getOrderStatus } from '../api/orderStatus';
import Card from '../components/Card';
import {sendDriverRating} from '../api/Rating';


const MiddleSection = ( {current_status, driver_name} ) => {
  
  if (current_status === 'picking') {
    return (
      <View style={styles.textContainer}>
        <Text style={{color: 'white', fontSize: 28}}>{driver_name} is on the way to pick up your order.</Text>
      </View>
    );
  }
  else if (current_status === 'orderPicked') {
    return (
      <View style={styles.textContainer}>
        <Text style={{color: 'white', fontSize: 28}}>{driver_name} has picked up your order. They are on their way to you.</Text>
      </View>
    );
  }
  else if (current_status === 'orderArrived') {
    return (
      <View style={styles.textContainer}>
        <Text style={{color: 'white', fontSize: 28}}>Your order is here. Please receive it.</Text>
      </View>
    );
  }
  else if (current_status === 'done' || current_status === 'delivery_success')
  {
    return (
      <View style={styles.textContainer}>
        <Text style={{color: 'white', fontSize: 28}}>Your order was successfully delivered. Thank you for using La-dou.
        </Text>
      </View>
    );
  }
  else if (current_status === 'pending')
  {  
    return (
      <View style={styles.textContainer}>
        <Text style={{color: 'white', fontSize: 28}}>Waiting on confirmation. The order is pending.</Text>
      </View>
    );
  }
  else if (current_status === 'null')
  {  
    return (
      <View style={styles.textContainer}>
        <Text style={{color: 'white', fontSize: 28}}>No Orders Yet.</Text>
      </View>
    );
  }
  return (
    <View style={styles.textContainer}>
      <Text style={{color: 'white', fontSize: 28}}>Waiting on confirmation. The order is pending.</Text>
    </View>
  );
};

const BottomSection = ({current_status}) => {

  if (current_status === 'picking') {
    return (
      <>
        <AppButton primary>
          Contact Driver
        </AppButton>
        <AppButton>
          Cancel Order
        </AppButton>
      </>
    );
  }
  // TODO : NEED TO UPDATE WITH PROPER RATING SYS
  else if (current_status === 'delivery_success') {
    return (
      <>
        <Card
          onSubmitHandler={async (rating: any) => {
            try {
              // const res = await sendDriverRating(driver_roll, rating);
              Alert.alert('Success', 'Rating submitted');
              //TODO:  handle next step
            } catch (e) {
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
  else if (current_status === 'pending' || current_status === 'null')
  {
    return (
      <>
        <Text style={{color: 'white', fontSize: 28}}></Text>
      </>
    );
  }
  return (
    <>
      <AppButton primary>
        Contact Driver
      </AppButton>
    </>
  );
};

const AcceptBid = () => {
  const {colors} = useTheme();
  // const [pickup, setPickup] = React.useState('');\
  // const [orderStatus, setOrderStatus] = React.useState('');
  // const [driverName, setDriverName] = React.useState('');

  // React.useEffect(() => {
  //   async function fetchOrderStatus() {
  //     const response = await getOrderStatus();
  //     setOrderStatus(response.status);
  //     setDriverName(response.driver_name);
  //   }
  //   fetchOrderStatus();
  // }, []);

  // // let current_stat = getOrderStatus();
  // console.log("Current status:", orderStatus)

  let orderStatus = "delivery_success";
  let driverName = "John Doe";

  return (
    <View style={styles.container}>
      <MiddleSection current_status={orderStatus} driver_name={driverName}/>
      <BottomSection current_status={orderStatus}/>
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
});


// current_status === 'picking'
// current_status === 'orderPicked'
// current_status === 'orderArrived'
// current_status === 'done'