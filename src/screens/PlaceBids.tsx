import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';

import AppButton from '../components/Button';
import Card from '../components/Card';
import HrText from '../components/HrText';

import {getJobs} from '../api/Jobs';
import { MainStackParamList } from '../navigation/MainStack';



type PlaceBidsProps = NativeStackScreenProps<MainStackParamList, 'PlaceBids'>;

const PlaceBids: React.FC<PlaceBidsProps> = ({navigation}) => {
  const {colors} = useTheme();
  const onSubmit = () => {};

  const [jobs, setJobs] = React.useState([]);

  //   Every 5 seconds, fetch the jobs from the server
  React.useEffect(() => {
    const interval = setInterval(() => {
      getJobs().then(res => {
        setJobs(res.data);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        Available Jobs
      </HrText>
      <ScrollView>
        <Card
          onSubmitHandler={onSubmit}
          children={1}
          data={{to: 'SSE Entrance', from: 'SSE Entrance'}}
        />
        {/* {jobs.map((job, index) => (
            <Card
                key={index}
                onSubmitHandler={onSubmit}
                children={1}
                data={{to: job.to, from: job.from}}
            />
        ))} */}
      </ScrollView>
      <AppButton primary > Next </AppButton>
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
