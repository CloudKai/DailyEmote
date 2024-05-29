import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions = {{
        headerStyle: {
            backgroundColor: '#1C357F',
        },
        headerTintColor: '#fff',
    }}>
    <Tabs.Screen
        name = "home"
        options = {{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name = "home" color = {color} size = {size}/>
          }}
      />
      <Tabs.Screen
        name = "data"
        options = {{
            tabBarLabel: 'My Analytics',
            title: 'My analytics',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name = "fitness-outline" color = {color} size = {size}/>
        }}
        />
    </Tabs>
  );
};

export default TabsLayout;