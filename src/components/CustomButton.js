import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({ title, onPress, colors = ['#4274DA', '#00BFFF'], style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
      <LinearGradient colors={colors} style={styles.button}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:'90%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin:10
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;
