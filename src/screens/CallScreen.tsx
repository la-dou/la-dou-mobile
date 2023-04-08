import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {MainStackParamList} from '../navigation/MainStack';
import PrimaryTheme from '../theme/Primary';

import {Linking} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {role} from '../atoms';
import {useRecoilState} from 'recoil';

type CallScreenProps = NativeStackScreenProps<MainStackParamList, 'CallScreen'>;
const CallScreen: React.FC<CallScreenProps> = ({navigation, route}) => {
  const [userRole, setUserRole] = useRecoilState(role);
  const phone_number = route.params.phone_number; // pass driver or customer phone number as a route param

  const handlePhoneCall = (phoneNumber: any) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity // whole thing is a btn this can be changed
        onPress={() => handlePhoneCall(phone_number)}
        style={{
          height: 250,
          width: 250,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../assets/images/phone-icon.png')}
          style={{width: 100, height: 100}}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Montserrat-Regular',
            fontWeight: '400',
            color: PrimaryTheme.colors.primary,
            lineHeight: 24,
          }}>{`Contact your ${
          userRole === 'customer' ? 'driver' : 'customer'
        }`}</Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Montserrat-bold',
            fontWeight: '600',
            color: PrimaryTheme.colors.primary,
            lineHeight: 24,
          }}>
          {`+92 ${phone_number.slice(1, 4)} ${phone_number.slice(
            4,
            6,
          )} ${phone_number.slice(6, 8)} ${phone_number.slice(8, 11)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallScreen;
