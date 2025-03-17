import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import BackIcon from '@/components/BackIcon';
import CustomView from '@/components/CustomView';

export default function AppointmentScreen() {
  return (
    <CustomView backgroundColor='#25292e' style={styles.container}>
      <CustomView backgroundColor='#ffd33d' width={"80%"} height={"50%"} style={styles.customView}>
        <Text>
          Just to check this
        </Text>
      </CustomView>
      <BackIcon path='(tabs)' />
    </CustomView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  customView: {
    borderRadius : 30,
  }
});
