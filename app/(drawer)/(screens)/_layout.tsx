import { Stack, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import React from 'react';

const TabsLayout = () => {
  return (
    <View style= {{ flex: 1 }}>
      
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
              tabBarIcon: ({ color, size }) => 
              <Ionicons 
                name = "home" 
                color = {color} 
                size = {size}
              />
            }}
        />
        <Tabs.Screen
          name = "create"
          options = {{
              tabBarLabel: '',
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style = {{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 56,
                  width: 56,
                  borderRadius: 999,
                  backgroundColor: "#6082B6",
                  marginBottom: 26
                }}>
                  <Ionicons
                    name = "add"
                    color = "white"
                    size = {24}
                  />
                </View>
              )
            }}
        />
        <Tabs.Screen
          name = "data"
          options = {{
              tabBarLabel: 'Health',
              headerShown: false,
              tabBarIcon: ({ color, size }) => 
              <Ionicons 
                name = "fitness-outline" 
                color = {color} 
                size = {size}
              />
          }}
          />
      </Tabs>
    </View>
  );
};

export default TabsLayout;