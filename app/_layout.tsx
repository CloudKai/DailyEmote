import { FIREBASE_AUTH } from "@/FireBaseConfig";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <Stack>
      { user ? (
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen 
            name="(Home)" 
            options={{ headerShown: false }}/>
        )
      }
       
    </Stack>
  );
}
