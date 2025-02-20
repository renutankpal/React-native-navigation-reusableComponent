import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import images from '../images/images';
const shops = [
  { id: '1', name: "Sharma’s Paan", image: images.paan },
  { id: '2', name: 'Ikkat', image: images.ghadha },
  { id: '3', name: "Ekta’s Homemade", image:images.fruits },
];

const ShopGroup = () => {
      const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header/>
      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore Shops in Fresh Zone</Text>
      </View>

      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.shopCard}>
            <Image source={item.image} style={styles.shopImage} />
            <Text style={styles.shopName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
 
   </View>
  );
};

export default ShopGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7EAEF',
  },
 
  sectionHeader: {
    backgroundColor: '#F96B5C',
    padding: 12,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    padding: 15,
  },
  shopCard: {
    flex: 1,
   // backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
   // alignItems: 'center',
    padding: 10,
  },
  shopImage: {
    width: 150,
    height: 160,
    resizeMode:'cover',
    borderRadius: 10,
  },
  shopName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007B7F',
    padding: 15,
    paddingHorizontal: 40,
  },
});
