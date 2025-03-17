import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CustomViewProps {
  children?: ReactNode; // Allows React elements as children
  backgroundColor?: string; // Optional string for background color
  width?: number | `${number}%`; // Supports percentage or numeric values
  height?: number | `${number}%`; // Supports percentage or numeric values
  style?: ViewStyle | ViewStyle[]; // Optional style or array of styles
}

const CustomView: React.FC<CustomViewProps> = ({
  children,
  backgroundColor = 'white',
  width = '100%',
  height = '100%',
  style,
}) => {
  return (
    <View style={[styles.container, { backgroundColor, width: width as ViewStyle['width'], height: height as ViewStyle['height'] }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomView;
