import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#000',
  },
});

export default CustomText;
