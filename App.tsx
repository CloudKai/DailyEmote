import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/Login';
import Home from './app/Home';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FireBaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={Home} />
    </InsideStack.Navigator>
  );
}

export default function App() {
const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  onAuthStateChanged(FIREBASE_AUTH, (user) => {
    console.log('user', user);
    setUser(user);
  });
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen 
            name="Inside" 
            component={InsideLayout} 
            options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


