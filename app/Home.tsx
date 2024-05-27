import { View, Text, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FireBaseConfig';
import { styles } from '../styleSheets/Styles';

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
    console.log('logged out');
  };

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
}