import { useNavigation } from 'expo-router';
import React from 'react';
import { useLayoutEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { FIREBASE_AUTH } from "@/FireBaseConfig";
import { router } from "expo-router";
import { signOut } from 'firebase/auth';
import styles from '../styles/globalStyles';

export default function Home() {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home Page',
    });
  }, [navigation]);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title="Sign Out" onPress={() => handleLogout} />
    </View>
  );
}