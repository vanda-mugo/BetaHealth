import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import {useRouter, Link} from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Pressable onPress={() => router.push({pathname : '/(screens)/vitals'
      })}>
        <View>
          <Text style={styles.text}> Go to Vitals</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => router.push('/(screens)/appointments')}>
        <View>
          <Text style={styles.text}> Go to appointments</Text>
        </View>
      </Pressable>
      <TouchableOpacity>
        <Link href={"/(screens)/journal"}>
          <Text style={styles.text}> Go to journal</Text>
        </Link>
      </TouchableOpacity>
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
