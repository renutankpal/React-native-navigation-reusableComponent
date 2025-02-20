import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';

interface Address {
  id: string;
  address: string;
}

const initialAddresses: Address[] = [
  { id: '1', address: 'EA789, Salarpuria Greenage\nBangalore' },
  { id: '2', address: 'EA723, Salarpuria Greenage\nBangalore' },
  { id: '3', address: '234, Prestige Kew Gardens\nBangalore' },
];

const ViewAddress = () => {
              const navigation = useNavigation();
    
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  // Function to handle address deletion
  const handleDelete = (id: string) => {
    Alert.alert('Delete Address', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setAddresses(addresses.filter(addr => addr.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
              onBackPress={() => navigation.goBack()}
/>
      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{item.address}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ViewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    backgroundColor: '#E6F2F1',
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  addressText: {
    fontSize: 20,
    color: '#333',
    flex: 1,
  },
  deleteText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
