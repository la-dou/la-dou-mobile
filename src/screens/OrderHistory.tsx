import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HrText from '../components/HrText';
import {useTheme} from '@react-navigation/native';
import InfoCard from '../components/InfoCard';

import {getOrderHistory} from '../api/Jobs';

type Order = {
  order_id: string;
  deliver_to : string;
  order_amount: Number;
  placed_at: string;
  driver_name: string;
}

const OrderHistory = () => {
  const {colors} = useTheme();

  const [orders, setOrders] = React.useState<Order[]>([]);

  // Fetch the order history from the server and store it in the orders state
  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getOrderHistory();
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        Order History
      </HrText>
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders?.map((item, index) => (
          <InfoCard key={index} data={[
            {
              title: 'Name: ',
              data: item.driver_name,
            },
            {
              title: 'Date: ',
              data: item.placed_at ? item.placed_at.slice(0, 10) : 'Not Available',
            },
            {
              title: 'Total: ',
              data: String(item.order_amount),
            },
            {
              title: 'Drop: ',
              data: item.deliver_to,
            },
          ]}/>
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: '30%',
    paddingBottom: 0,
  },
});
