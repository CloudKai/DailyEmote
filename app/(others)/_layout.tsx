import React from 'react'
import { Stack } from 'expo-router'

const othersLayout = () => {
  return (
    <Stack>
      <Stack.Screen name = "viewEntryFull" options={{ headerShown: false }} />
      <Stack.Screen name = "editEntry" options={{ headerShown: false }} />
    </Stack>
  )
}

export default othersLayout;