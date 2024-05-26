import { Link, useRouter, Stack, useNavigation, Redirect } from 'expo-router';
import { Text, View } from "react-native";
import { useEffect, useState } from 'react';
import Login from './(Login)/Login';
import styles from '../styles/globalStyles';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from '@/FireBaseConfig';

export default function Index() {
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log('user', user);
  //     setUser(user);
  //   })
  // });

  return (
    <Redirect href={"./screens/Login/Login"} />
  );
}
