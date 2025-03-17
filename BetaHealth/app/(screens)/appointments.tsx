import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import BackIcon from '@/components/BackIcon';

export default function AppointmentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Appointment screen</Text>
      <BackIcon path='(tabs)' />
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
  },
});
