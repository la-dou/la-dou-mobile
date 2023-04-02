import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import React from 'react';
import PrimaryTheme from '../theme/Primary';
import RatingButton from './RatingButton';

export type CardProps = {
  onSubmitHandler: () => void;
  children: number; // 0 for rating, 1 for driver bid, 2 for customer bid
};
const Card = (props: CardProps) => {
  const {colors} = PrimaryTheme;
  const [rating, setRating] = React.useState(0);
  const [driverBid, setDriverBid] = React.useState('');
  return (
    <View
      style={{
        backgroundColor: '#262626',

        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#CB4B47',
        width: '94%',
        height: 100,
        padding: 0,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '80%',
          alignItems: 'center',
        }}>
        {/* star as children */}
        {props.children === 0 ? (
          <RatingButton getRating={(rating: number) => setRating(rating)} />
        ) : null}

        {/* driver bid as children */}
        {props.children === 1 ? (
          <View
            style={{
              flexDirection: 'row',

              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Montserrat-Regular',
                  height: 20,
                  fontWeight: '400',
                  color: colors.primary,
                  lineHeight: 20,
                }}>
                In Gate
              </Text>

              <Image
                source={require('../assets/images/down-arrow.png')}
                style={{resizeMode: 'contain', width: 20, height: 20}}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Montserrat-Regular',
                  height: 20,
                  fontWeight: '400',
                  color: colors.primary,
                  lineHeight: 20,
                }}>
                Out Gate
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: colors.primary,
                borderBottomWidth: 1,
                width: '20%',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat-Regular',
                  color: colors.primary,
                  fontWeight: '400',
                }}>
                Rs.
              </Text>
              <TextInput
                // value={`Rs. ${driverBid}`}
                // onChangeText={text => setDriverBid(text.replace(/^Rs. /, ''))}

                placeholderTextColor={colors.primary}
                value={driverBid}
                onChangeText={text => setDriverBid(text)}
                //underline
                style={{
                  color: colors.primary,

                  fontSize: 15,
                  fontFamily: 'Montserrat-Regular',
                  height: 40,
                  fontWeight: '400',

                  textAlign: 'center',
                }}
              />
            </View>
          </View>
        ) : null}

        {/* customer bid as children */}
        {props.children === 2 ? (
          <View
            style={{
              flexDirection: 'row',

              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Regular',
                height: 24,
                fontWeight: '400',
                color: colors.primary,
                lineHeight: 24,
              }}>
              Soomro
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Regular',
                height: 20,
                fontWeight: '700',
                color: colors.primary,
                lineHeight: 24,
              }}>
              Rs. 200
            </Text>
          </View>
        ) : null}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#591028',
          borderRadius: 5,
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,

          height: '100%',
        }}
        onPress={props.onSubmitHandler}>
        <Image
          source={require('../assets/images/logo-check.png')}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Card;
