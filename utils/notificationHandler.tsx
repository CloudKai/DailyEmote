import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";

export interface PushNotificationState {
  expoPushToken?: string;
  notification?: Notifications.Notification;
  registerForPushNotificationsAsync: () => Promise<string | undefined>;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    string | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const registerForPushNotificationsAsync = async (): Promise<string | undefined> => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification");
      return undefined;
    }

    if (Platform.OS === "android" && Device.isDevice) {
      // For physical Android devices
      const pushToken = await messaging().getToken();
      token = pushToken; 
      setExpoPushToken(token);
      console.log("Android Device Token:", token);
    } else if (Platform.OS === "android" && !Device.isDevice) {
      // For Android emulators
      const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      token = pushToken;
      setExpoPushToken(token);
      console.log("Android Emulator Token:", token);
    } else {
      // For other platforms (e.g., web)
      Alert.alert("Push notifications are not supported on this platform");
      return undefined;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    notification,
    registerForPushNotificationsAsync,
  };
};