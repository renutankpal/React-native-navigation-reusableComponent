import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import images from '../images/images';
const paymentMethods = [
  { id: '1', name: 'Debit / Credit Card', icon: 'credit-card' },
  { id: '2', name: 'Net Banking', icon: 'bank-outline' },
  { id: '3', name: 'Cash On Delivery', icon: 'cash' },
];

const upiApps = [
  { id: 'gpay', image: images.gpay},
  { id: 'paytm', image: images.Paytm },
  { id: 'phonepe', image: images.Phonepe },
  { id: 'amazonpay', image: images.Amazonpay },
];

const Payment = () => {
          const navigation = useNavigation();
    
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [upiId, setUpiId] = useState('');
  const cartItems = [
    { id: '1', shop: 'Polar Bear Ice Cream Shop', name: 'Bananza Sundae', size: '[500 ml x 3]', price: 150 },
    { id: '2', shop: 'Polar Bear Ice Cream Shop', name: 'Gadbad', size: '[1 pcs x 1]', price: 30 },
    { id: '3', shop: 'Ekta Homemade', name: 'Samosa', size: '[1 pcs x 3]', price: 75 },
  ];
  
  

  // Group items by shop name
const groupedCartItems = cartItems.reduce((acc, item) => {
  if (!acc[item.shop]) {
    acc[item.shop] = [];
  }
  acc[item.shop].push(item);
  return acc;
}, {} as Record<string, typeof cartItems>);

  const discount = 10.00;
  const totalAmount =
    cartItems.reduce((acc, item) => acc + item.price, 0) - discount;

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
      title="Payment"
      onBackPress={() => navigation.goBack()}

      />
      
      <Text style={styles.sectionTitle}>Select Payment Method</Text>

      {/* Payment Methods List */}
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={styles.paymentMethod}
          onPress={() => setExpandedMethod(method.id === expandedMethod ? null : method.id)}
        >
          <View style={styles.paymentRow}>
            <MaterialCommunityIcons name={method.icon} size={25} color="#000" />
            <Text style={styles.paymentText}>{method.name}</Text>
          </View>
          <MaterialCommunityIcons name={expandedMethod === method.id ? 'chevron-up' : 'chevron-down'} size={25} color="#000" />
        </TouchableOpacity>
      ))}

      {/* UPI Payment Section */}
      <TouchableOpacity
        style={[styles.paymentMethod]}
        onPress={() => setExpandedMethod(expandedMethod === 'upi' ? null : 'upi')}
      >
        <View style={styles.paymentRow}>
          <Text style={styles.upiIcon}>₹</Text>
          <Text style={styles.paymentText}>UPI</Text>
        </View>
        <MaterialCommunityIcons name={expandedMethod === 'upi' ? 'chevron-up' : 'chevron-down'} size={25} color="#000" />
      </TouchableOpacity>

      {expandedMethod === 'upi' && (
        <View style={styles.upiDetails}>
          <Text style={styles.chooseAppText}>Choose App</Text>

          {/* UPI Apps */}
          <View style={styles.upiAppRow}>
            {upiApps.map((app) => (
              <TouchableOpacity key={app.id} style={styles.upiApp}>
                <Image source={app.image} style={styles.upiAppIcon} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.orDivider}>
            <Text style={styles.orText}>Or</Text>
          </View>

          {/* UPI ID Input */}
          <Text style={styles.enterUpiText}>Enter UPI ID</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={upiId}
              onChangeText={setUpiId}
            />
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <CustomButton 
      title="continue"
      onPress={()=>navigation.navigate('OrderConfirm')}
      colors={['#FF6B5E', '#FF6B5E']} 
      style={{margin:10}} 

      />
      
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    
  },
   sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    margin: 15,
  },
  paymentMethod: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
     borderWidth: 0.3,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
  upiContainer: {
    borderWidth: 1.5,
    borderColor: '#000',
  },
  upiIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  upiDetails: {
   // backgroundColor: '#F9F9F9',
    padding: 5,
    borderRadius: 8,
   // borderWidth: 1,
    borderColor: '#ddd',
   margin: 15,

  },
  chooseAppText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  upiAppRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  upiApp: {
    width: 60,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  upiAppIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  orText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  enterUpiText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  verifyText: {
    color: '#666',
    fontWeight: 'bold',
  },
});
