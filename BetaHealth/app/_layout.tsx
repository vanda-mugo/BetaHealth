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

import { useColorScheme } from '@/hooks/useColorScheme';
//import { SessionProvider } from '@/components/ctx';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [ authChecked, setAuthChecked ] = useState<boolean>(false);

  NavigationBar.setBackgroundColorAsync("#25292e");
  const router = useRouter();

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // this checks the auth state of the user
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user: User | null) => {
      console.log('this User:', user);
      setUser(user);
      setAuthChecked(true);
      

    });

    //cleanup listener on unmount
    return () => {
      unsubscribe();
    };  

  }, []);

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
            </>
          )}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar backgroundColor='#25292e'/>
      </ThemeProvider>
    
  );
}
