import React, { useEffect } from 'react';
import { StatusBar, View, StyleSheet,Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import images from '../images/images';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import Address from '../screens/Address';
import OrderDetails from '../screens/OrderDetails';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrderHistory from '../screens/OrderHistory';
import Applycoupon from '../screens/Applycoupon';
import Payment from '../screens/Payment';
import OrderConfirm from '../screens/OrderConfirm';
import MyAccount from '../screens/MyAccount';
import ShopFront from '../screens/ShopFront';
import ShopGroup from '../screens/ShopGroup';
import OrderSummary from '../screens/OrderSummary';
import JoinCommunity from '../screens/JoinCommunity';
import OtpVerification from '../screens/OtpVerification';
import YellowPage from '../screens/YellowPage';
import ViewAddress from '../screens/ViewAddress';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// **Bottom Tab Navigator for Dashboard & ShopFront**
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#007B7F', height: 60,  },
        tabBarShowLabel: false, 
        tabBarItemStyle: { 
        //  justifyContent: 'center', 
        alignSelf: 'center',
        marginVertical:10,
      },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Dashboard') {
            return <MaterialCommunityIcons name="home" size={30} color="#fff" />;
          } else if (route.name === 'ShopGroup') {
            return  <Image
                        source={images.cart}
                        style={styles.cartIcon}
                      />;
            // <MaterialCommunityIcons name="home" size={28} color="#fff" />;
            
          }
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="ShopGroup" component={ShopGroup} />
    </Tab.Navigator>
  );
}
// Authentication stack
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}


export default function AppNavigator() {

  return (
    <NavigationContainer>
      <View style={styles.statusBarContainer}>
         <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      </View>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="ViewAddress" component={ViewAddress} />
        <Stack.Screen name="JoinCommunity" component={JoinCommunity} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="ShopFront" component={ShopFront} />
        <Stack.Screen name="ShopGroup" component={ShopGroup} />
        <Stack.Screen name="YellowPage" component={YellowPage} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="Applycoupon" component={Applycoupon} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  statusBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StatusBar.currentHeight || 24,
    zIndex: 1,
  },
  cartIcon:{
    width:25,
    height:25
  },
  gradient: {
    flex: 1,
    backgroundColor: 'transparent', 
  },
  statusBarGradient: {
    flex: 1,
  },
});