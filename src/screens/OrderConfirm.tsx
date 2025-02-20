import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';

const OrderConfirm = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CommonHeader onBackPress={() => navigation.navigate('OrderSummary')} />
      {/* Success Message Card */}
      <View style={styles.cardVW}>
        <View style={styles.card}>
          <Text style={styles.message}>
            Thank you for helping a local business grow.
          </Text>

          <Text style={styles.orderText}>
            Your <Icon name="bag" size={18} color="#FF6B6B" /> Order{' '}
            <Text style={styles.orderId}>1234-xyz</Text> has been placed
            successfully.
          </Text>

          <Text style={styles.rewardText}>
            <Icon name="gift" size={18} color="#FF6B6B" /> Hurray! You have
            earned <Text style={styles.coinText}>5 xx Coins</Text> on this
            order.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F',
  },
  cardVW: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 120,
  },
  card: {
    backgroundColor: '#DFF6F3',
    width: '90%',
    borderRadius: 10,
    padding: 30,
  },
  message: {
    fontSize: 20,
    color: '#000',
    marginBottom: 15,
  },
  orderText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
    fontWeight: '400',
  },
  orderId: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  rewardText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
  },
  coinText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});
