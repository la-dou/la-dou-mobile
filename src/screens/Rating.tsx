import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../components/Card';
import {MainStackParamList} from '../navigation/MainStack';
import PrimaryTheme from '../theme/Primary';
import {sendDriverRating} from '../api/Rating';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type RatingProps = NativeStackScreenProps<MainStackParamList, 'Rating'>;
const Rating: React.FC<RatingProps> = ({navigation, route}) => {
  // navigat prop
  //console.log('rendered rating screen');
  const driver_roll = route.params.driver_roll_number;
  const [rating, setRating] = React.useState(0);
  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: '80%'}}>
      <View>
        <Text style={styles.textStyles}>Your order was successfully</Text>
        <Text style={[styles.textStyles, styles.delivered]}>delivered </Text>
        <Text style={styles.textStyles}>Thank you for using</Text>
        <Text style={styles.textStyles}>La-dou</Text>
        <Text style={[styles.textStyles, styles.delivered, styles.rate]}>
          Rate the driver:
        </Text>
        <Card
          onSubmitHandler={async (rating: any) => {
            try {
              const res = await sendDriverRating(driver_roll, rating);
              Alert.alert('Success', 'Rating submitted');
              //TODO:  handle next step
            } catch (e) {
              Alert.alert('Error', 'Something went wrong');
              //TODO:  handle next step
            }
          }}
          children={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    color: PrimaryTheme.colors.primary,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
  },
  delivered: {
    marginBottom: 20,
  },
  rate: {
    marginTop: 100,
  },
});

export default Rating;
