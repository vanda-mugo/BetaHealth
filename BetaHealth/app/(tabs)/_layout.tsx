import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar, Pressable } from 'react-native';
import { Redirect } from 'expo-router';
import React from 'react';

import { useAuth } from '@/components/AuthContext';

export default function TabLayout() {

  const { user} = useAuth();
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/signIn" />;
  }

  return (
    <>
    <StatusBar backgroundColor="#25292e" barStyle="light-content" />
    <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            animation:"none",
            headerShown: false,
            headerStyle: {
              backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
              backgroundColor: '#25292e',
              borderTopWidth: 0,
              elevation: 0,
              transitionDuration: "0.3s",
            },
            tabBarButton: (props) => <Pressable {...props} 
            android_ripple={null}
            />,
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
