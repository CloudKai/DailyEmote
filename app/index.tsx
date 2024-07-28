import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getItem } from '../utils/asyncStorage';
import { usePushNotifications } from '../utils/notificationHandler';
import messaging from '@react-native-firebase/messaging';

const index = () => {

    const [showOnBoarding, setShowOnBoarding] = useState<any>(null);
    const { registerForPushNotificationsAsync } = usePushNotifications();

    useEffect(() => {
        checkIfAlreadyOnBoarded();
        registerForPushNotificationsAsync().then(() => {
            // Subscribe to the topic
            messaging()
              .subscribeToTopic('all-users')
              .then(() => console.log('Subscribed to topic!'))
              .catch(error => console.error('Failed to subscribe to topic', error));
          });
    }, [])

    const checkIfAlreadyOnBoarded = async () => {
        let onboarded = await getItem('onboarded');
        if(onboarded == '1') {
            //hide onboarding
            //To test onboarding, set this true
            setShowOnBoarding(false);
        } else {
            //show onboarding
            setShowOnBoarding(true);
        }
    }

    if (showOnBoarding == null) {
        return null;
    }

    if (showOnBoarding) {
        return <Redirect href="/onboarding" />;
    } else {
        return <Redirect href="/(auth)/signin" />;
    }
};

export default index;