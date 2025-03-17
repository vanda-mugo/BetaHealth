import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';


interface BackIconProps {
  path : string
}

export default function BackIcon({ path } : BackIconProps) {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push(path as any)}>
      <Ionicons name='arrow-back' size={24} color={'#ffd33d'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
});
