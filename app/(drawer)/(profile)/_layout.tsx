import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import React from 'react';

const ProfileLayout = () => {
    return (
        <Stack>
            <Stack.Screen name = "profile" options = {{headerShown: false }} />
            <Stack.Screen name = "image" options = {{headerShown: false }} />
        </Stack>
    )
}

export default ProfileLayout;