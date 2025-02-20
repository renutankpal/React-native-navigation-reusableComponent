import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Geolocation from '@react-native-community/geolocation';
import { setUserLocation } from '../redux/community/communitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from "../theme/variables/config"; // Adjust path accordingly

const { width } = Dimensions.get("window");

const JoinCommunity: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();


  // ✅ Component State
  const [latlng, setLatlng] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [nearbyCommunity, setNearbyCommunity] = useState<any | null>(null);

  const [allCommunities, setAllCommunities] = useState<any[]>([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

 // ✅ Get Current Location (Without Retry)
const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log("✅ Got location:", latitude, longitude);
      setLatlng({ latitude, longitude }); // ✅ Save in State
      dispatch(setUserLocation({ latitude, longitude })); // ✅ Save in Redux
    },
    (error) => {
      Alert.alert("Error", "Failed to get location. Please try again.",error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 5000 }
  );
};


  // ✅ Call getCurrentLocation when component mounts
  useEffect(() => {
    if (!latlng.latitude || !latlng.longitude) {
      getCurrentLocation();
    } else {
      setLatlng(latlng);
    }
  }, []);

  useEffect(() => {
    if (latlng.latitude !== null && latlng.longitude !== null) {
      fetchNearbyCommunities();
      fetchAllCommunities();
    }
  }, [latlng]);
  
  const fetchNearbyCommunities = async () => {
    try {
      setLoadingNearby(true);
  
      const { latitude, longitude } = latlng;
      if (!latitude || !longitude) {
        setLoadingNearby(false);
        return;
      }
  
      // ✅ Fetch Nearby Communities
      const nearbyResponse = await axios.get(
        `${BASE_URL}/location/community/suggestions?latlng=${latitude},${longitude}`
      );
      const nearbyList = nearbyResponse.data;
      console.log("✅ Nearby Response:", nearbyList);
      setLoadingNearby(false);
  
      if (nearbyList.length > 0) {
        setNearbyCommunity(nearbyList[0]);
      } else {
        setNearbyCommunity(null);
      }
    } catch (error) {
      console.error("❌ Nearby Community API Error:", error);
      Alert.alert("Failed to load nearby communities.");
      setLoadingNearby(false);
    }
  };
  
  const fetchAllCommunities = async () => {
    try {
      setLoadingAll(true);
  
      // ✅ Fetch All Communities
      const allResponse = await axios.get(`${BASE_URL}/community/all`);
      console.log("✅ All Communities Response:", allResponse.data);
      setLoadingAll(false);
  
      let filteredCommunities = allResponse.data;
  
      if (nearbyCommunity) {
        // ✅ Remove nearby community from all communities list
        filteredCommunities = allResponse.data.filter(
          (community) => community.id !== nearbyCommunity.id
        );
      }
  
      setAllCommunities(filteredCommunities);
    } catch (error) {
      console.error("❌ All Communities API Error:", error);
      Alert.alert("Failed to load all communities.");
      setLoadingAll(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>

        {loadingNearby ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : nearbyCommunity ? (
          <>
            <Text style={styles.sectionTitle}>Nearby Community Suggested</Text>
            <TouchableOpacity
              style={styles.communityButton}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <Text style={styles.communityText}>{nearbyCommunity}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.sectionTitle}>No nearby community suggestions found.</Text>
        )}
 <Text style={styles.sectionTitle}>
            While You can also explore other communities
            </Text>
        {loadingAll ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : allCommunities.length > 0 && (
          <>
           
            <FlatList
              data={allCommunities}
              keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.communityButton}
                  onPress={() => navigation.navigate("YellowPage")}
                >
                  <Text style={styles.communityText}>{item}</Text>
                </TouchableOpacity>
              )}
              scrollEnabled={false}
            />
          </>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007B7F",
    paddingTop: 50,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 22,
  },
  communityButton: {
    width: width * 0.85,
    backgroundColor: "#E7F3F5",
    paddingVertical: 20,
    borderRadius: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  communityText: {
    fontSize: 20,
    color: "#000000",
  },
});

export default JoinCommunity;
