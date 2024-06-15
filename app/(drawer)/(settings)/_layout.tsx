import React from 'react'
import { Stack } from 'expo-router'

const settingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name = "mainSetting" options={{ headerShown: false }} />
    </Stack>
  )
}

export default settingLayout