import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text, Dimensions, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import images from "../images/images";
import { BASE_URL } from "../theme/variables/config"; 
console.log('====================================BASE_URL',BASE_URL);
const { width, height } = Dimensions.get("window");
interface SplashScreenProps {
  navigation: StackNavigationProp<any, any>;
}
const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {


useEffect(() => {
  const checkSession = async () => {
    try {
      const sessionId = await AsyncStorage.getItem("sessionId");
      console.log("Session ID......:", sessionId);

      if (!sessionId) {
        console.log("No session ID found, navigating to Onboarding.");
        navigation.replace("Onboarding");
        return;
      }

      const response = await axios.get(`${BASE_URL}/login/session?sessionId=${sessionId}`);
      console.log("Response from session check:", response.data);

      if (response.data === true) {
        navigation.replace("JoinCommunity");
      } else {
        navigation.replace("Onboarding");
      }
      
    } catch (error) {
      console.error("Error checking session:", error);
      navigation.replace("Onboarding");
    }
  };

  checkSession();
}, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      <View style={styles.menu}>
        <View style={styles.menuItem}>
          <Image source={images.storeIcon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.menuText}>Know Your Community</Text>
        </View>
        <View style={styles.menuItem}>
          <Image source={images.homeIcon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.menuText}>Support Local Businesses</Text>
        </View>
        <View style={styles.menuItem}>
          <Image source={images.giftIcon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.menuText}>Earn Rewards</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#007B7F", paddingHorizontal: width * 0.05 },
  logo: { width: width * 0.4, height: height * 0.1, marginBottom: height * 0.05 },
  loader: { marginVertical: 20 },
  menu: { width: width * 0.8 },
  menuItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  icon: { width: 35, height: 35, margin: 10, tintColor: "#E0E0E0" },
  menuText: { color: "#E0E0E0", fontSize: 18, fontWeight: "bold" },
});

export default SplashScreen;
