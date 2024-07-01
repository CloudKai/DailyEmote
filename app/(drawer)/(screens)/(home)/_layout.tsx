import React from 'react'
import { Stack } from 'expo-router'

const viewEntryLayout = () => {
  return (
    <Stack initialRouteName='home'>
      <Stack.Screen name = "home" options={{ headerShown: false }} />
      <Stack.Screen name = "viewEntryFull" options={{ headerShown: false }} />
      <Stack.Screen name = "editEntry" options={{ headerShown: false }} />
    </Stack>
  )
}

export default viewEntryLayout;