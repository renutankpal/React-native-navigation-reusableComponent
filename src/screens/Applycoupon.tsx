import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import images from '../images/images';

const ApplyCoupon = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CommonHeader 
      title="Apply Coupon" 
      onBackPress={() => navigation.goBack()}
/>
      <Text style={styles.availableCoupons}>Available Coupons</Text>

      {/* Coupon Card */}
      <ImageBackground
        source={images.Bg_copon}
        style={styles.couponCard}>
        <View style={styles.couponHeader}>
          <Image
            source={images.Percent}
            style={styles.couponIcon}
          />
          <Text style={styles.couponTitle}>FLAT 10% OFF</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('OrderSummary')}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>

        {/* Coupon Details */}
        <View style={styles.couponDetails}>
          <Text style={styles.detailText}> • 10% on Order Value</Text>
          <Text style={styles.detailText}> • No Minimum Order Cap</Text>
          <Text style={styles.detailText}> • Unlimited Usage</Text>
        </View>
      </ImageBackground>
      {/* Terms & Conditions */}
      <Text style={styles.termsText}>Terms & Conditions Apply</Text>
    </View>
  );
};

export default ApplyCoupon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F',
  },

  availableCoupons: {
    width: '80%',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    alignItems: 'center',
    margin: 20,
  },
  couponCard: {
    width: 380,
    height: 191,
    alignSelf: 'center',
     },
  couponHeader: {
    flexDirection: 'row',
    width:360,
    height:80,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FF9A9A', // Dotted Red Border
    borderStyle: 'dashed',
  },
  couponIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  applyText: {
    color: '#FF4D4D',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  couponDetails: {
    margin: 10,
  },
  detailText: {
    fontSize: 18,
    color: '#333',
    fontWeight:'400',
    marginVertical: 2,
  },
  termsText: {
    textAlign: 'center',
    margin:18,
    color: '#e8e8e8',
    fontSize: 20,
  },
});
