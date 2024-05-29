import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
      <Stack initialRouteName="signin">
        <Stack.Screen name = "signin" options={{ headerShown: false }} />
        <Stack.Screen name = "signup" options={{ headerShown: false }} />
        <Stack.Screen name = "tnc" options={{ title: "Terms and Conditions", headerTitleAlign: 'center' }} />
      </Stack>

  )
}

export default AuthLayout;