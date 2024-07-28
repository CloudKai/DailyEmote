import { Stack } from 'expo-router'
import React from 'react'

const settingLayout = () => {
  return (
    <Stack initialRouteName='mainSetting'>
      <Stack.Screen name = "mainSetting" options={{ headerShown: false }} />
      <Stack.Screen name = "notification" options={{ headerShown: false }} />
      <Stack.Screen name = "privacy" options={{ headerShown: false }} />
      <Stack.Screen name = "help" options={{ headerShown: false }} />
    </Stack>
  )
}

export default settingLayout