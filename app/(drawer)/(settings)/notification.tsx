import React, { useEffect, useState } from 'react';
import { View, Text, Switch, SafeAreaView, StyleSheet, Alert, Pressable, Platform } from 'react-native';
import { styles, colors } from '../../../styleSheets/Styles';
import HeaderComponent from '../../../components/HeaderComponent';
import { router } from 'expo-router';
import { usePushNotifications } from '../../../utils/notificationHandler';
import ConfirmButton from '../../../components/ConfirmButton';
import * as ExpoNotifs from 'expo-notifications';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const messages = [
  "Remember to write down how you are feeling today.",
  "Don't forget to jot down your thoughts today.",
  "Take a moment to reflect and write about your feelings today.",
  "Have you noted how you feel today? Take a moment to do so.",
  "It's a good time to record your feelings. How are you doing today?",
];

const getRandomMessage = () => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export default function Notifications() {
  const { expoPushToken, notification, registerForPushNotificationsAsync } = usePushNotifications();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const enableNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      Alert.alert('Notifications Enabled');
    } else {
      Alert.alert('Failed to enable notifications');
      setIsEnabled(false);
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || selectedTime;
    setShowTimePicker(false);
    setSelectedTime(currentDate);
  };

  // Trigger a notification in 3 second when triggered
  const triggerDailyNotification = async () => {
    if (isEnabled) {
      const message = getRandomMessage();

      await ExpoNotifs.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: message,
        },
        trigger: { seconds: 3 },
      });
    } else {
      Alert.alert('Notifications are disabled');
    }
  };

  const setDailyNotification = async () => {
    if (isEnabled) {
      const trigger = new Date(selectedTime);
      const message = getRandomMessage();
      trigger.setSeconds(0);

      await ExpoNotifs.cancelAllScheduledNotificationsAsync(); // Clear existing notifications
      await ExpoNotifs.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: message,
        },
        trigger: {
          hour: trigger.getHours(),
          minute: trigger.getMinutes(),
          repeats: true,
        },
      });
    }
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (isEnabled) {
      enableNotifications();
      setDailyNotification();
    }
  }, [isEnabled]);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoNotifs.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access notifications was denied');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={notifStyles.container}>
      <View style={notifStyles.headerContainer}>
        <HeaderComponent title="Notifications" goBack={goBack} />
      </View>
      <View style={notifStyles.content}>

        <View style={notifStyles.switchContainer}>
          <Text style={notifStyles.label}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={notifStyles.textContainer}>
          <Text style={styles.whiteText}>Daily Reminder: </Text>
          <Pressable style={styles.textInput} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.blackText}>
              {selectedTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}
            </Text>
          </Pressable>
        </View>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <View style={notifStyles.buttonContainer}>
          <ConfirmButton 
            title="Trigger Daily Notification" 
            handlePress={triggerDailyNotification} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const notifStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    marginVertical: 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 20,
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: 20,
  }
});
