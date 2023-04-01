import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import PrimaryTheme from '../theme/Primary';
import {authToken} from '../atoms';

export type CardProps = {
  btnExists: boolean;
  onSubmitHandler: () => void;
  children: React.FC<any>;
};
const Card = (props: CardProps) => {
  const {colors} = PrimaryTheme;
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
        {/* {props.children} */}
        {/* <View
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
        </View> */}
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
              height: 24,
              fontWeight: '700',
              color: colors.primary,
              lineHeight: 24,
            }}>
            Rs. 200
          </Text>
        </View>
      </View>

      {props.btnExists ? (
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
      ) : null}
    </View>
  );
};

export default Card;
