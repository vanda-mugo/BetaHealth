import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <>
    <StatusBar backgroundColor="#25292e" barStyle="light-content" />
    <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
              backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
              backgroundColor: '#25292e',
              borderTopWidth: 0,
              elevation: 0,
            },
        }}
      >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color, focused}) => (
        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={24} color={color} />) 
        }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({color, focused}) => (
        <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />) 
        }} />
    </Tabs>
    </>
  );
}
