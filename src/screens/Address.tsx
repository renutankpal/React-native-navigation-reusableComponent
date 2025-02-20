import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import CommonHeader from "../components/CommonHeader";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
const {width} = Dimensions.get('window');

const Address = () => {
      const navigation = useNavigation();
    
  const [doorNumber, setDoorNumber] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([
    "Cedar A201, Salarpuria Greenage, Bangalore",
    "Deodar A201, Salarpuria Greenage, Bangalore",
  ]);

  const handleSaveAddress = () => {
    if (doorNumber.trim()) {
      const newAddress = `${doorNumber}, Salarpuria Greenage`;
      setSavedAddresses([...savedAddresses, newAddress]);
      setDoorNumber("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <CommonHeader
        onBackPress={() => navigation.goBack()}
      />

      {/* Add New Address Section */}
      <View style={styles.addressBox}>
        <Text style={styles.title}>Add New Addresses</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter door no."
          value={doorNumber}
          onChangeText={setDoorNumber}
        />
        <Text style={styles.preFilledText}>Salarpuria Greenage</Text>
        <CustomButton
          title="save"
          colors={['#FF6B5E', '#FF6B5E']}
          onPress={()=>navigation.navigate('OrderSummary')}
          style={{width:'70%',alignSelf:'center',borderRadius:20}}
        />
        
      </View>

      {/* Saved Addresses Section */}
      <View style={styles.addressBox}>
        <Text style={styles.title}>Select from Saved Addresses</Text>
        <FlatList
          data={savedAddresses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.savedAddress}>
              <Text style={styles.addressText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00796b",
   // padding: 20,
  },
  backButton: {
    fontSize: 24,
    color: "white",
    marginBottom: 15,
  },
  addressBox: {
    backgroundColor: "#e0f3f1",
    width:width*0.88,
    alignSelf:'center',
    justifyContent:'center',
    padding: 20,
    borderRadius: 10,
    marginVertical:width*0.09,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    width:width*0.7,
    alignSelf:'center',
    textAlign: "left",
    margin: 10,
  },
  preFilledText: {
    backgroundColor: "#ccc",
    width:width*0.7,
    alignSelf:'center',
    borderRadius: 25,
    padding: 12,
    fontSize: 16,
    textAlign: "center",
    color: "#000000",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#ff6b5e",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  savedAddress: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  addressText: {
    fontSize: 14,
  },
});

export default Address;
