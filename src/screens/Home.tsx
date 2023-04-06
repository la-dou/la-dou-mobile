import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRecoilState} from 'recoil';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  authToken as authTokenAtom,
  userDetails as userDetailsAtom,
  role as roleAtom,
} from '../atoms';
import PrimaryTheme from '../theme/Primary';
import MenuButton from '../components/MenuButton';
import {getUser} from '../api/User';
import {MainStackParamList} from '../navigation/MainStack';
import {
  requestPushNotifPermission,
  registerForPushNotifications,
  unregisterForPushNotifications,
} from '../utils/notifications';
import {addDeviceToken, removeDeviceToken} from '../api/Fcm';

type LoginProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const Home: React.FC<LoginProps> = ({navigation}) => {
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
  const [role, setRole] = useRecoilState(roleAtom);
  const isAdmin = userDetails?.role === 'admin';
  const greetings = [
    'Hello',
    'Hi',
    'Hey',
    'Welcome',
    'Hi there',
    'Hey there',
    'Howdy',
  ];
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

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
      // removing the phone_verified check for now
      // uncomment the following line to add the check
      // if (!user.email_verified || !user.phone_verified) {
      if (!user.email_verified) {
        Alert.alert(
          'Account not verified',
          "You need to verify your email and phone number before you can use the app. You'll now be redirected to the OTP page to verify your account.",
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Otp', {
                  rollNumber: user.roll_no,
                  path: 'Home',
                  phone_verified: user.phone_verified,
                  email_verified: user.email_verified,
                });
              },
            },
          ],
        );
      }
      if (user.driver_disabled && user.customer_disabled) {
        Alert.alert(
          'Account disabled',
          'Your account has been disabled. Please contact the admin for more details.',
          [
            {
              text: 'OK',
              onPress: () => {
                handleLogout();
              },
            },
          ],
        );
      }
      if (user.customer_disabled) {
        setRole('driver');
      } else if (user.driver_disabled) {
        setRole('customer');
      }
    });

    // set up push notifications
    requestPushNotifPermission().then(async () => {
      try {
        const FCMToken = await registerForPushNotifications();
        console.log(FCMToken);
        await addDeviceToken(authToken, FCMToken);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  const handleLogout = async () => {
    // remove FCM token
    try {
      const FCMToken = await unregisterForPushNotifications();
      await removeDeviceToken(authToken, FCMToken);
    } catch (error) {
      console.log(error);
    }
    // clear auth token
    setAuthToken('');
  };

  return (
    <View style={styles.continaer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>
          {greeting},{`\n${userDetails?.name.split(' ')[0]}`}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        {isAdmin ? (
          <MenuButton
            primary
            iconSource={require('../assets/images/search-icon.png')}
            text="Search"
            onPress={() => {
              navigation.navigate('Search');
            }}
          />
        ) : (
          <>
            <MenuButton
              primary
              iconSource={
                role === 'customer'
                  ? require('../assets/images/cart-icon.png')
                  : require('../assets/images/bids-icon.png')
              }
              text={role === 'customer' ? 'Place Orders' : 'Place Bids'}
            />
            <MenuButton
              primary
              iconSource={require('../assets/images/switch-icon.png')}
              text={
                role === 'customer' ? 'Switch to Driver' : 'Switch to Customer'
              }
              onPress={() => {
                if (role === 'customer' && userDetails?.driver_disabled) {
                  Alert.alert(
                    'Account disabled',
                    'Your driver account has been disabled. Please contact the admin for more details.',
                  );
                  return;
                }
                if (role === 'driver' && userDetails?.customer_disabled) {
                  Alert.alert(
                    'Account disabled',
                    'Your customer account has been disabled. Please contact the admin for more details.',
                  );
                  return;
                }
                setRole(role === 'customer' ? 'driver' : 'customer');
              }}
            />
            <MenuButton
              iconSource={require('../assets/images/history-icon.png')}
              text="History"
            />
          </>
        )}
        <MenuButton
          primary={isAdmin}
          iconSource={require('../assets/images/profile-icon.png')}
          text="Profile"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <MenuButton
          iconSource={require('../assets/images/logout-icon.png')}
          text="Logout"
          onPress={handleLogout}
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
