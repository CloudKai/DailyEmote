// import React from 'react';
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import React from 'react';

const AuthStack = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    console.log('hello');
    return (
      <Stack>
        {user ? (
          <Stack.Screen name="home" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        )}
      </Stack>
    );
  }
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <AuthStack />
    </AuthProvider>
  );
}

export default RootLayout;