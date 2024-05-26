import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';

export default function Home() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home Page',
    });
  }, [navigation]);

  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
}