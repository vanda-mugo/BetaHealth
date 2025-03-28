import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import React from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { onAuthStateChanged, User } from '@firebase/auth';
import { FIREBASE_AUTH } from '@/firebase';
import { AuthProvider, useAuth } from '@/components/AuthContext';

import { useColorScheme } from '@/hooks/useColorScheme';
//import { SessionProvider } from '@/components/ctx';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


function AppContent() {

  NavigationBar.setBackgroundColorAsync("#25292e");
  //const router = useRouter();
  const {user, authChecked} = useAuth();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !authChecked) {
    return null;
  }

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
        screenOptions={{
          animation: "fade_from_bottom",
          gestureEnabled: true,
          animationTypeForReplace: "push",
          headerShown: false,
        }}>
          {/* to implement conditional navigation */}
          {user ? (
            <>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name='(screens)' options={{headerShown : false}} />
            </>
          ) : (
            <>
              <Stack.Screen name="signIn" options={{headerShown: false}} />
              <Stack.Screen name="signUp" options={{headerShown: false}} />
            </>
              
          )}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar backgroundColor='#25292e'/>
      </ThemeProvider>
    
  );
}
