import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HrText from '../components/HrText';
import {useTheme} from '@react-navigation/native';
import InfoCard from '../components/InfoCard';

const OrderHistory = () => {
  const {colors} = useTheme();
  const data = [
    {
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },
    {
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },
    {
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },
    {
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },
    {
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },
    {
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },{
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },
    {
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },
    {
      name: 'Saad Mehmoon',
      date: '02/04/2023',
      total: 'Rs. 500',
      drop: 'SSE Entrance',
    },
  ]
  return (
    <View style={styles.container}>
      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        Order History
      </HrText>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, index) => (
          <InfoCard key={index} data={[
            {
              title: 'Name: ',
              data: item.name,
            },
            {
              title: 'Date: ',
              data: item.date,
            },
            {
              title: 'Total: ',
              data: item.total,
            },
            {
              title: 'Drop: ',
              data: item.drop,
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
