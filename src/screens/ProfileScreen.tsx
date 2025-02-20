import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header/Header';
import CommonHeader from '../components/CommonHeader';
const { width } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <CommonHeader
        title="Profile"
        onBackPress={() => navigation.goBack()}
      />
      {/* Input Fields */}
      <View style={styles.inputView}>
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#A6C4C6" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#A6C4C6" keyboardType="email-address" />

      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={() => console.log('Update Profile')}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems:'center'
  },
  inputView:{
     alignItems:'center',
     justifyContent:'center',
     width: width*0.8,
     height: 250,


  },
  input: {
    width: width*0.6,
    height: 50,
    backgroundColor: '#E5F2F2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#FF6B5E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
   // margin: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
