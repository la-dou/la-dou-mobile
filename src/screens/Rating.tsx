import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../components/Card';
import {MainStackParamList} from '../navigation/MainStack';
import PrimaryTheme from '../theme/Primary';
import {sendDriverRating, sendCustomerRating} from '../api/Rating';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useRecoilState} from 'recoil';
import {role as roleAtom} from '../atoms';

type RatingProps = NativeStackScreenProps<MainStackParamList, 'Rating'>;
const Rating: React.FC<RatingProps> = ({navigation, route}) => {
  // navigat prop
  //console.log('rendered rating screen');
  const [role, setRole] = useRecoilState(roleAtom);
  //console.log(role);
  const roll_number_to_rate = route.params.roll_number_to_rate;
  const [rating, setRating] = React.useState(0);
  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: '80%'}}>
      <View>
        <Text style={styles.textStyles}>Your order was successfully</Text>
        <Text style={[styles.textStyles, styles.delivered]}>delivered </Text>
        <Text style={styles.textStyles}>Thank you for using</Text>
        <Text style={styles.textStyles}>La-dou</Text>
        <Text style={[styles.textStyles, styles.delivered, styles.rate]}>
          Rate the {role === 'driver' ? 'customer' : 'driver'}
        </Text>
        <Card
          onSubmitHandler={async (rating: any) => {
            try {
              if (role === 'driver') {
                const res = await sendCustomerRating(
                  roll_number_to_rate,
                  rating,
                );
              } else {
                const res = await sendDriverRating(roll_number_to_rate, rating);
              }
              Alert.alert('Success', 'Rating submitted');
              //TODO:  handle next step
            } catch (e) {
              Alert.alert('Error', 'Something went wrong');
              //console.log(e);
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
