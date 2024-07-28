import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getItem } from '../utils/asyncStorage';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

const index = () => {

    const [showOnBoarding, setShowOnBoarding] = useState<any>(null);

    useEffect(() => {
        const performInitialSetup = async () => {
            if (!__DEV__) {
                if (Updates.isEnabled) {
                    await checkForUpdates();
                }
            }
            await checkIfAlreadyOnBoarded();
        };

        performInitialSetup();
    }, [])

    const checkIfAlreadyOnBoarded = async () => {
        let onboarded = await getItem('onboarded');
        if(onboarded == '1') {
            //hide onboarding
            //To test onboarding, set this true
            setShowOnBoarding(true);
        } else {
            //show onboarding
            setShowOnBoarding(true);
        }
    }

    const checkForUpdates = async () => {
        try {
            console.log("Checking for updates...");
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                console.log("Update available, fetching...");
                await Updates.fetchUpdateAsync();
                Alert.alert(
                    "Update Available",
                    "An update is available and will be applied.",
                    [
                        {
                            text: "Reload",
                            onPress: () => {
                                Updates.reloadAsync();
                            }
                        }
                    ]
                );
            } else {
                console.log("No updates available");
            }
        } catch (e) {
            console.error("Error checking for updates:", e);
        }
    };

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