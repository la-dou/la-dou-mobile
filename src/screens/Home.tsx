import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useRecoilState} from 'recoil';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import {authToken as authTokenAtom} from '../atoms';
import PrimaryTheme from '../theme/Primary';
import MenuButton from '../components/MenuButton';
import {getUser} from '../api/User';
import { useNavigation } from '@react-navigation/native';
import { MainStack } from '../navigation/UserDriverStack';

interface userDetailsInterface {
  name: string;
  roll_no: string;
  phone_number: string;
  phone_verified: boolean;
  email_verified: boolean;
}

type LoginProps = NativeStackScreenProps<MainStack, 'Home'>;

const Home: React.FC<LoginProps> = ({navigation}) => {
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  const [userDetails, setUserDetails] =
    React.useState<userDetailsInterface | null>(null);

  React.useEffect(() => {
    const retriveUserDetails = async () => {
      try {
        const user = await getUser(authToken);
        setUserDetails(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    };

    retriveUserDetails().then(user => {
      if (!user.email_verified || !user.phone_verified) {
        Alert.alert(
          'Account not verified',
          "You need to verify your email and password before you can use the app. You'll now be redirected to the OTP page to verify your account.",
        );
        // navigation.navigate('Otp');
      }
    });
  }, []);

  return (
    <View style={styles.continaer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>
          Hi there,{`\n${userDetails?.name.split(' ')[0]}`}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <MenuButton
          primary
          iconSource={require('../assets/images/cart-icon.png')}
          text="Place Order"
        />
        <MenuButton
          primary
          iconSource={require('../assets/images/switch-icon.png')}
          text="Switch to Driver"
        />
        <MenuButton
          iconSource={require('../assets/images/history-icon.png')}
          text="History"
        />
        <MenuButton
          iconSource={require('../assets/images/profile-icon.png')}
          text="Profile"
        />
        <MenuButton
          iconSource={require('../assets/images/logout-icon.png')}
          text="Logout"
          onPress={() => {
            setAuthToken('');
            // EncryptedStorage.removeItem('token')
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  continaer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  greetingContainer: {
    flex: 0.45,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  greeting: {
    fontFamily: 'Montserrat-Medium',
    color: PrimaryTheme.colors.primary,
    fontSize: 48,
    lineHeight: 48,
  },
  menuContainer: {
    flex: 1.55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
