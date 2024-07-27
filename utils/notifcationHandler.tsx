// import { useEffect } from 'react';
// import { Platform } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// import Constants from 'expo-constants';

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

// const useNotificationService = () => {
//   useEffect(() => {
//     registerForPushNotificationsAsync();
//   }, []);

//   useEffect(() => {
//     const subscription = Notifications.addNotificationReceivedListener(notification => {
//       console.log(notification);
//     });

//     const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(subscription);
//       Notifications.removeNotificationSubscription(responseSubscription);
//     };
//   }, []);
// };

// export default useNotificationService;
