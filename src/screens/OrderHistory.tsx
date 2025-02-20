import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';

interface Order {
  id: string;
  shopName: string;
  amount: string;
  date: string;
  status: string;
}

const orders: Order[] = [
  { id: '1', shopName: 'Multiple Shops', amount: '₹ 245', date: 'Jan 16, 6:29 PM', status: 'Partially Dispatched' },
  { id: '2', shopName: 'Gupta Shop', amount: '₹ 25', date: 'Jan 15, 8:29 PM', status: 'Delivered' },
  { id: '3', shopName: 'Ajfan Dates', amount: '₹ 180', date: 'Jan 06, 6:29 PM', status: 'Cancelled' },
];

const OrderHistory = () => {
      const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
      title="Order History"
        onBackPress={() => navigation.goBack()}
      />
    

      {/* Section Title */}
      <Text style={styles.sectionTitle}>PAST 1 YEAR ORDERS</Text>

      {/* Order List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderCard} onPress={()=> navigation.navigate('OrderDetails')}>
            <View style={styles.orderInfo}>
              <Text style={styles.shopName}>{item.shopName}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.status}>{item.status}</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward-circle" size={28} color="#FF6F61" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    marginLeft: 20,
  },
  orderCard: {
    backgroundColor: '#EAF6F6',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 20,
    color: '#333',
  },
  amount: {
    fontSize: 18,
    color: '#333',
    fontWeight:'700',
    marginVertical: 2,
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 18,
  },
});
