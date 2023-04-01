import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

export const requestPushNotifPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  return enabled;
};

export const registerForPushNotifications = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('FCM Token: ', token);
  return token;
};

export const unregisterForPushNotifications = async () => {
  const token = await messaging().getToken();
  await messaging().unregisterDeviceForRemoteMessages();
  console.log('FCM Token: ', token);
  return token;
}
