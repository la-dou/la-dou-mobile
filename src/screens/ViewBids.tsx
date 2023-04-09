import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';

import AppButton from '../components/Button';
import Card from '../components/Card';
import HrText from '../components/HrText';
import {getBids, acceptBid} from '../api/Jobs';
import { MainStackParamList } from '../navigation/MainStack';

type Bid = {
  driver_roll_no: Number;
  name: string;
  bid: string;
};

type ViewBidsProps = NativeStackScreenProps<MainStackParamList, 'ViewBids'>;

const ViewBids: React.FC<ViewBidsProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [bids, setBids] = React.useState<[Bid]>();

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getBids();
        setBids(data);
        
      } catch (err) {
        console.log(err);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);
  const onSubmit = async (driver_roll_no: Number) => {
    try {
      await acceptBid(driver_roll_no);
      navigation.replace('WaitScreen');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        Bids
      </HrText>
      <ScrollView>
        {bids?.map((bid, index) => {
          bid.bid = 'Rs. ' + bid.bid;
          return (
            <Card
              key={index}
              onSubmitHandler={() => onSubmit(bid.driver_roll_no)}
              children={2}
              data={bid}
            />
          );
        })}
      </ScrollView>
      <AppButton primary> Cancel Order </AppButton>
    </View>
  );
};

export default ViewBids;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '30%',
    padding: 30,
    alignItems: 'center',
  },
});
