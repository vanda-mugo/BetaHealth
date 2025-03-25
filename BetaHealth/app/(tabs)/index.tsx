import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import {useRouter, } from 'expo-router';
import { FIREBASE_AUTH } from '@/firebase';

export default function HomeScreen() {
  const router = useRouter();


  return (
    <View style={styles.container}>
      <Pressable
        onPress={async () => {
            try {
              await FIREBASE_AUTH.signOut();
              console.log('Signed out successfully!');
              router.replace('/signIn');
            } catch (error) {
              console.error('Error signing out:', error);
            }
          }}
        >
        <View style={styles.signOut}>
        </View>
      </Pressable>

      <Pressable onPress={() => router.push({pathname : '/(screens)/vitals'
      })}>
        <View style={styles.vitals}>
          <Text style={styles.text}> Vitals</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => router.push('/(screens)/appointments')}>
        <View style={styles.view}>
          <Text style={styles.text}> Appointments</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => router.push('/(screens)/journal')}>
        <View style={styles.view}>
          <Text style={styles.text}> Journal</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    padding: 20,
    fontWeight: "500",
  },
  view:{
    height : 110,
    width : 350,
    backgroundColor: "#ffd33d",
    borderRadius: 40,
    marginVertical:20
  },
  vitals:{
    height : 350,
    width : 350,
    backgroundColor: "#ffd33d",
    borderRadius: 40,
    marginVertical:20
  }, 
  signOut: {
    color : 'red',
    height: 40, 
    width: 40,
    backgroundColor: 'red',
    borderRadius: 20,
    
    }
});
