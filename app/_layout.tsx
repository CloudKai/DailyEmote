import { Stack } from 'expo-router';
import 'expo-dev-client';
import React = require('react');

const MainLayout = () => {

  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(others)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default MainLayout;