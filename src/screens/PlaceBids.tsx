import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';

import AppButton from '../components/Button';
import Card from '../components/Card';
import HrText from '../components/HrText';

import {getJobs, postBid} from '../api/Jobs';
import {MainStackParamList} from '../navigation/MainStack';

type PlaceBidsProps = NativeStackScreenProps<MainStackParamList, 'PlaceBids'>;

type Job = {
  id: string;
  deliver_to: string;
  deliver_from: string;
  notes: string;
  delivery_price: Number;
  order_amount: Number;
  placed_at: string;
  status: string;
  driver_roll_no: Number;
};

const PlaceBids: React.FC<PlaceBidsProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [jobs, setJobs] = React.useState<[Job]>();

  //   Every 5 seconds, fetch the jobs from the server
  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        console.log(err);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        Available Jobs
      </HrText>
      <ScrollView>
        {jobs?.map((job, index) => (
          <Card
            key={index}
            onSubmitHandler={async (driverBid: Number) => {
              try {
                await postBid(job.id, driverBid);
                navigation.replace('WaitScreen', {id: job.id});
              } catch (err) {
                console.log(err);
              }
            }}
            children={1}
            data={{
              to: job.deliver_to,
              from: job.deliver_from,
              bid: job.delivery_price,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PlaceBids;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%',
    padding: 30,
    alignItems: 'center',
  },
});
