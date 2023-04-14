import {StyleSheet, Alert, View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import AppButton from '../components/Button';
import {
  cancelInProgressOrder,
  getOrderStatus,
} from '../api/Jobs';
import Card from '../components/Card';
import {sendDriverRating} from '../api/Rating';
import PrimaryTheme from '../theme/Primary';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainStack';
import {inProgressOrderId as inProgressOrderIdState} from '../atoms';

type MiddleSectionProps = {
  current_status: string;
  driver_name: string;
};
const MiddleSection: React.FC<MiddleSectionProps> = ({
  current_status,
  driver_name,
}) => {
  if (current_status === 'assigned') {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>
          {driver_name} is on the way to pick up your order.
        </Text>
      </View>
    );
  } else if (current_status === 'picked') {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>
          {driver_name} has picked up your order. They are on their way to you.
        </Text>
      </View>
    );
  } else if (current_status === 'arrived') {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>
          Your order is here. Please receive it.
        </Text>
      </View>
    );
  } else if (current_status === 'done' || current_status === 'delivered') {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>
          Your order was successfully delivered. Thank you for using La-dou.
        </Text>
      </View>
    );
  } else if (current_status === 'null') {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>No Orders Yet.</Text>
      </View>
    );
  }
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyles}>
        Waiting on confirmation. The order is pending.
      </Text>
    </View>
  );
};

type BottomSectionProps = {
  current_status: string;
  driver_roll_no: Number;
  navigation: any;
};
const BottomSection: React.FC<BottomSectionProps> = ({
  current_status,
  driver_roll_no,
  navigation,
}) => {
  if (current_status === 'assigned') {
    return (
      <>
        <AppButton
          primary
          onPress={() => {
            navigation.navigate('Chat', {
              guest_roll_no: driver_roll_no,
            });
          }}>
          Contact Driver
        </AppButton>
        <AppButton
          onPress={async () => {
            try {
              await cancelInProgressOrder();
              Alert.alert('Success', 'Order cancelled');
              navigation.replace('Home');
            } catch (e) {
              Alert.alert('Error', 'Something went wrong');
            }
          }}>
          Cancel Order
        </AppButton>
      </>
    );
  } else if (current_status === 'delivered') {
    return (
      <>
        <Card
          children={0}
          onSubmitHandler={async (rating: any) => {
            try {
              const res = await sendDriverRating(driver_roll_no, rating);
              Alert.alert('Success', 'Rating submitted');

              //TODO:  handle next step
              // await updateInProgressOrderStatus('done');
              navigation.replace('Home');
            } catch (e) {
              // console.log(e);
              Alert.alert('Error', 'Something went wrong');

              //TODO:  handle next step
            }
          }}
          // onSubmitHandler={() => {}}
        />
      </>
    );
  } else if (current_status === 'done') {
    return (
      <>
        <Text style={{color: 'white', fontSize: 28}}>
          Thank you for your feedback.
        </Text>
      </>
    );
  } else if (
    current_status === 'pending' ||
    current_status === 'null' ||
    !current_status
  ) {
    return (
      <>
        <Text style={{color: 'white', fontSize: 28}}></Text>
      </>
    );
  } else
    return (
      <>
        <AppButton
          primary
          onPress={() => {
            navigation.navigate('Chat', {
              guest_roll_no: Number(driver_roll_no),
            });
          }}>
          Contact Driver
        </AppButton>
      </>
    );
};

type AcceptBidProps = NativeStackScreenProps<MainStackParamList, 'AcceptBid'>;

const AcceptBid: React.FC<AcceptBidProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [current_status, setCurrentStatus] = React.useState('null');
  const [driver_name, setDriverName] = React.useState('null');
  const [driver_roll, setDriverRoll] = React.useState('null');
  const [inProgressOrderId, setInProgressOrderId] = useRecoilState(
    inProgressOrderIdState,
  );

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getOrderStatus(inProgressOrderId);
        console.log("AcceptBidScreen:", data, inProgressOrderId)
        if (data.status in ['delivered', 'done', 'cancelled']) {
          clearInterval(interval);
          setInProgressOrderId(null);
        }
        setCurrentStatus(data.status);
        setDriverName(data.assignee_name);
        setDriverRoll(data.assigned_to);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* {current_status ? <MiddleSection current_status={current_status} driver_name={driver_name}/> : <></>} */}
      <MiddleSection
        current_status={current_status}
        driver_name={driver_name}
      />
      <BottomSection
        current_status={current_status}
        driver_roll_no={Number(driver_roll)}
        navigation={navigation}
      />
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
  },
});

// current_status === 'picking'
// current_status === 'orderPicked'
// current_status === 'orderArrived'
// current_status === 'done'
