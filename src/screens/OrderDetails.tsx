import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';

interface Item {
  name: string;
  quantity: string;
  price: string;
}

interface Shop {
  id: string;
  name: string;
  status: string;
  items: Item[];
}

const orderDetails = {
  orderId: '1',
  shopName: 'Multiple Shops',
  deliveryAddress: 'EH78, Salarpuria Greenage',
  dateTime: 'Jan 16, 6:29 PM',
  shops: [
    {
      id: '1',
      name: 'Polar Bear Ice Cream Shop',
      status: 'Accepted',
      items: [
        { name: 'Bananza Sundae', quantity: '[1 pcs x 1]', price: '₹ 150' },
        { name: 'Gadbad', quantity: '[500 ml x 3]', price: '₹ 30' },
      ],
    },
    {
      id: '2',
      name: 'Ekta Homemade',
      status: 'Dispatched',
      items: [{ name: 'Samosa', quantity: '[1 pcs x 3]', price: '₹ 75' }],
    },
  ],
  totalFees: '₹ 0',
  totalCoinsUsed: '₹ 0',
  couponDiscount: '₹ 10',
  totalPaid: '₹ 245',
};

const OrderDetails = () => {
    const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
              onBackPress={() => navigation.goBack()}

      />
        {/* Order Info */}
        <View style={{    backgroundColor: '#EAF6F6',
}}>

      <View style={styles.orderSummary}>
        <Text style={styles.shopName}>{orderDetails.shopName}</Text>
        <Text style={styles.deliveryAddress}>Delivery to: {orderDetails.deliveryAddress}</Text>
        <Text style={styles.dateTime}>{orderDetails.dateTime}</Text>
      </View>

      {/* Order Items */}
      <FlatList
        data={orderDetails.shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <>
          <View style={styles.shopContainer}>
            <View style={styles.shopHeader}>
              <Text style={styles.shopTitle}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            {item.items.map((product, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemQuantity}>{product.quantity}</Text>
                <Text style={styles.itemPrice}>{product.price}</Text>
              </View>
            ))}
             
          </View>
          
         </>
        )}
      />

      {/* Billing Details */}
      <View style={styles.billContainer}>
           <View style={styles.billRow}>
             <Text style={styles.billText}>Total Fees:</Text>
             <Text style={styles.billAmount}>{orderDetails.totalFees}</Text>
           </View>
           <View style={styles.billRow}>
             <Text style={styles.billText}>Total Coins Used (-):</Text>
             <Text style={styles.billAmount}>{orderDetails.totalCoinsUsed}</Text>
           </View>
           <View style={styles.billRow}>
             <Text style={styles.billText}>Coupon Discount (-):</Text>
             <Text style={styles.billAmount}>{orderDetails.couponDiscount}</Text>
           </View>
           <View style={styles.billRowTotal}>
             <Text style={styles.billTotalText}>Total Paid</Text>
             <Text style={styles.billTotalAmount}>{orderDetails.totalPaid}</Text>
           </View>
         </View>
         </View>

    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F', // Background Color

  },
 
  orderSummary: {
    padding: 20,
    backgroundColor: '#EAF6F6',

  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  dateTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  shopContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    padding: 15,
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  billContainer: {
    padding: 20,
    marginVertical:20,
    justifyContent: 'flex-start',
    borderTopWidth: 2,
    borderTopColor: '#FF9A9A', // Dotted Red Border
    borderStyle: 'dashed',

   // backgroundColor: '#007B7F',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  billText: {
    fontSize: 14,
    color: '#000',
  },
  billAmount: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  billRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 0.4,
    borderTopColor: '#ddd',
    paddingTop: 5,
  },
  billTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  billTotalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
