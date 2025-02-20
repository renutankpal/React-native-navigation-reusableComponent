import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import CustomButton from '../components/CustomButton';
import images from '../images/images';
const {width} = Dimensions.get('window');

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
}

const OrderSummary: React.FC = () => {
  const navigation = useNavigation();

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
      <View style={styles.headerBackground} />

      <CommonHeader
        title="Order Summary"
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.deliveryInfo} onPress={()=>navigation.navigate('Address')}>
          <Text style={styles.deliveryText}>
            Delivery to <Text style={styles.boldText}>AB2003, Greenage</Text>
          </Text>
          <Text style={styles.timeText}>in 45-60 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.couponButton} onPress={()=>navigation.navigate('Applycoupon')} >
          <Image
            source={
              images.Percent
            }
            style={styles.bannerImage}
          />

          <Text style={styles.couponText}>View Coupons & Offers</Text>
          <Ionicons name="chevron-forward-circle" size={28} color="#FF6F61" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={Object.keys(groupedCartItems)}
        keyExtractor={(shop) => shop}
        renderItem={({ item: shop }) => (
          <View style={styles.cartCard}>
            {/* Section Header */}
            <Text style={styles.shopTitle}>{shop}</Text>
            {groupedCartItems[shop].map((product) => (
              <View key={product.id} style={styles.cartItem}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{product.name}</Text>
                  <Text style={styles.itemSize}>{product.size}</Text>
                <Text style={styles.itemPrice}>₹{product.price}</Text>
              </View>
              </View>

            ))}
          </View>
        )}
      />
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Platform Fees:</Text>
        <Text style={styles.priceAmount}>₹ 0.00</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Surcharge:</Text>
        <Text style={styles.priceAmount}>₹ 0.00</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Shipping Fees:</Text>
        <Text style={styles.priceAmount}>₹ 0.00</Text>
      </View>

      {/* Discount Section */}
      <View style={styles.discountContainer}>
        <Text style={styles.discountText}>XXNEW20 applied (-):</Text>
        <Text style={styles.discountAmount}>₹ 10.00</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Total & Redeem Section */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total 40 {' '}
        <Image source={images.coins} style={styles.coinImage} />
        </Text>
        <TouchableOpacity>
          <Text style={styles.applyText}>apply</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.redeemText}>Eligible to redeem 20  {' '}<Image source={images.coins} style={styles.coinImage} />
      </Text>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Payment')}>
      <Text style={styles.buttonText}>Click to Pay</Text>
      <Text style={styles.amountText}>₹{totalAmount}</Text>
    </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#e0f2f1'},
  headerBackground: {
    position: 'absolute',
    width: '100%',
    height: '32%',
    backgroundColor: '#007B7F',
  },
  contentContainer: {paddingHorizontal: 15},
  deliveryInfo: {padding: 5, width: width * 0.9, alignItems: 'center'},
  deliveryText: {color: '#fff', fontSize: 22, textAlign: 'center'},
  boldText: {fontWeight: 'bold'},
  timeText: {color: '#fff', fontSize: 22},
  couponButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    padding: 20,
    width: width * 0.8,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 5,
  },
  shopTitle: {fontSize: 18, fontWeight: 'bold', margin: 10, marginTop:0, color: '#000'},
  couponText: {
    color: '#000000',
    fontSize: 18,
    width: width * 0.6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bannerImage: {width: 25, height: 25},
  cartCard: {
    marginTop:30,
  },
  coinImage:{
    width:20,height:20
  },
  cartItem: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    width:width*0.93,
    marginHorizontal:18,
    shadowRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  itemDetails: {
    width:width*0.92,
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  itemName: {
    fontSize: 15,
    width:width*0.4,
    paddingHorizontal: 5,
    color: '#000000',
    fontWeight: '500',
  },
  itemSize: {
    fontSize: 14,
    width:width*0.2,
    alignItems:'center',
    color: '#000000',
  },
  itemPrice: {
    fontSize: 18,
    width:width*0.25,
    color: '#000000',
    alignItems:'flex-end',
    textAlign:'right',
    marginHorizontal:12,
    fontWeight: 'bold',
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    width:width*0.9,
  },
  priceText: {
    fontSize: 16,
    color: '#000000',
    margin: 5,

  },
  priceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',

  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    width:width*0.9,
    },
  discountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000000'
  },
  discountAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    width:width*0.9,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  applyText: {
    fontSize: 18,
    color: '#D32F2F',
    fontWeight: 'bold',
    textDecorationLine:'underline'
  },
  redeemText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#000000',

    marginVertical: 5,
  },
  button: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between texts
    alignItems: 'center', // Center items vertically
    backgroundColor: '#FF6B5E', // Button color
    padding: 15,
    margin: 10,
    marginVertical: 20,
    borderRadius: 20,
    width:width*0.92
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
   
});

export default OrderSummary;
