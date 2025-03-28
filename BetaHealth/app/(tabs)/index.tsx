import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import {useRouter, } from 'expo-router';
import { FIREBASE_AUTH } from '@/firebase';

export default function HomeScreen() {
  const router = useRouter();


  return (
    <View style={styles.container}>
      <View style={styles.signOutContainer} >
        <TouchableOpacity
        style={styles.signOut}
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
        
      </TouchableOpacity>
      </View>

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
    height: 10, 
    width: 30,
    backgroundColor: 'red',
    borderRadius: 5,
    marginRight:50,
    },
    signOutContainer: {
      width: '100%',  // Ensures it takes full width
      flexDirection: 'row',  // Aligns children horizontally
      justifyContent: 'flex-end',  // Pushes button to the right
      paddingBottom: 20, // Adds spacing
    },
});
