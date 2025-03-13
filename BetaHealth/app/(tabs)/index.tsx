import { Text, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import {useRouter} from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Pressable onPress={() => router.push('/(screens)/vitals')}>
        <View>
          <Text style={styles.text}> Go to Vitals</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => router.push('/(screens)/appointments')}>
        <View>
          <Text style={styles.text}> Go to appointments</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => router.push('/(screens)/journal')}>
        <View>
          <Text style={styles.text}> Go to journal</Text>
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
    color: '#fff',
    padding: 20,
  },
});
