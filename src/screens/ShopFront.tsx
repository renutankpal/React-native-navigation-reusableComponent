import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,Dimensions
} from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header/Header";
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import images from "../images/images";
interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  originalPrice: number;
  image: any;
  quantity: number;
}

const ShopFront: React.FC = () => {
      const navigation = useNavigation();
  
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Bananza Sundae",
      size: "500 ml",
      price: 50,
      originalPrice: 66,
      image: images.icecreame,
      quantity: 3,
    },
    {
      id: 2,
      name: "Gadbad",
      size: "1 Pcs bhh",
      price: 50,
      originalPrice: 66,
      image: images.icecreame,
      quantity: 5,
    },

    {
      id: 3,
      name: "Vanilla Sundaegg",
      size: "500 ml",
      price: 50,
      originalPrice: 66,
      image: images.icecreame,
      quantity: 4,
    },
  ]);

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />
      <Header 
              ONPRESS1={() => console.log('Location Pressed')}
              ONPRESS2={() => navigation.navigate('MyAccount')}
       />
      <View style={styles.contentContainer}>
        <View style={styles.shopDetails}>
          <Text style={styles.shopTitle}>Polar Bear Ice Cream Shop</Text>
          <Text style={styles.deliveryTime}>45-60 mins</Text>
          <Text style={styles.shopDesc}>
            A frosty adventure in every scoop, bringing wild flavors and creamy delight straight from the Arctic
          </Text>
        </View>
      </View>
      <FlatList
      data={cart}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.cartItem}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemSize}>{item.size}</Text>
          </View>

          {/* Quantity Controller */}
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, "decrease")}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityNumber}>{item.quantity.toString().padStart(2, "0")}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, "increase")}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Price Details */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.price * item.quantity}</Text>
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          </View>
        </View>
      )}
    />
      <View style={styles.footer}>
        <MaterialCommunityIcons name="home" size={28} color="#fff" />
        <Text style={styles.totalText}>Total Amount</Text>
        <Text style={styles.totalAmount}>₹{totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('OrderSummary')}>
        <MaterialCommunityIcons name="cart-plus" size={28} color="#fff" />

      
        {cart.length > 0 && (
      <View style={styles.cartBadge}>
        <Text style={styles.badgeText}>
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </Text>
      </View>
    )}
  </TouchableOpacity>

     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5f2f2" },
  headerBackground: { position: "absolute", width: "100%", height: "35%", backgroundColor: "#007B7F" },
  contentContainer: { flex: 1, marginTop: 20, paddingHorizontal: 15 },
  shopDetails: { backgroundColor: "#E5f2f2", borderRadius: 10, padding: 15, marginTop: 15 },
  shopTitle: { fontSize: 18, fontWeight: "bold" },
  deliveryTime: { fontSize: 14, fontWeight: "bold", marginVertical: 5 },
  shopDesc: { fontSize: 13, color: "gray" },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    width: width * 0.3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  itemSize: {
    fontSize: 12,
    color: "#7A7A7A",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.25,
    backgroundColor: "#E5F2F2",
    borderRadius: 8,
    paddingHorizontal: 4,
    marginHorizontal:5,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    paddingVertical: 4,
    textAlign: "center",
  },
  priceContainer: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007B7F",
  },
  originalPrice: {
    fontSize: 13,
    color: "#888",
    textDecorationLine: "line-through",
  },
  footer: {  
    backgroundColor: '#006D6F',
    position: 'relative',
    flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingVertical: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  totalText: { color: "white", fontSize: 16 },
  totalAmount: { color: "white", fontSize: 18, fontWeight: "bold" },
  cartButton: { padding: 8 },
  cartBadge: {
    position: 'absolute',
    right: -1,
    top: -5,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
});

export default ShopFront;
