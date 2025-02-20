import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '../components/CustomButton';
import images from '../images/images';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [gpsEnabled, setGpsEnabled] = useState(false);

  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  
  useEffect(() => {
    checkLocationPermission();
  }, []);

  // useEffect(() => {
  //   if (locationPermission && gpsEnabled && location.latitude && location.longitude) {
  //     console.log('✅ Location acquired:', location);
  //         const timeout = setTimeout(() => {
  //       navigation.replace('Login'); 
  //     }, 2000);
  
  //     return () => clearTimeout(timeout); 
  //   }
  // }, [locationPermission, gpsEnabled, location, navigation]);
  
  // ✅ Check GPS Enabled
  const checkGPSEnabled = () => {
    Geolocation.getCurrentPosition(
      () => setGpsEnabled(true),
      (error) => {
        if (error.code === 2) {
          setGpsEnabled(false);
          Alert.alert(
            'GPS Disabled',
            'Please turn on location services in settings to continue.',
            [{ text: 'OK' }]
          );
        }
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };

  // ✅ Check & Request Location Permission
  const checkLocationPermission = async () => {
    let permissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      console.log('✅ Location permission granted');
      setLocationPermission(true);
      checkGPSEnabled();
      getCurrentLocation(); // Fetch location immediately
    } else {
      const requestResult = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (requestResult === RESULTS.GRANTED) {
        setLocationPermission(true);
        checkGPSEnabled();
        getCurrentLocation(); // Fetch location immediately
      } else {
        Alert.alert(
          'Permission Denied',
          'Please enable location permissions in settings to continue.'
        );
      }
    }
  };

 
const getCurrentLocation = () => {
  if (location.latitude && location.longitude) {
    console.log("✅ Location already acquired:", location.latitude, location.longitude);
    return; 
  }

  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log("✅ Got location:", latitude, longitude);
      setLocation({ latitude, longitude }); 
    },
    (error) => {
      if (error.code === 3) { 
        console.warn("⚠️ Location request timed out. Using last known location if available...");
        if (location.latitude && location.longitude) {
          console.log("✅ Using previously acquired location:", location.latitude, location.longitude);
          return;
        }
      }

      console.error("❌ Get Location Error:", error);
      Alert.alert("Error", "Failed to get location. Please try again.");
    },
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 5000 }
  );
};


  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.menuItem}>
          <Image source={images.storeIcon} style={styles.icon} />
          <Text style={styles.menuText}>Know Your Community</Text>
        </View>
        <View style={styles.menuItem}>
          <Image source={images.homeIcon} style={styles.icon} />
          <Text style={styles.menuText}>Support Local Businesses</Text>
        </View>
        <View style={styles.menuItem}>
          <Image source={images.giftIcon} style={styles.icon} />
          <Text style={styles.menuText}>Earn Rewards</Text>
        </View>
      </View>

      <ImageBackground source={images.bg} style={styles.bgImage}>
        <Image source={images.line} style={styles.curveImage} />
        <Image source={images.location} style={styles.locationIcon} />

        <Text style={styles.permissionTitle}>
          {locationPermission && gpsEnabled ? 'Location Enabled' : 'Location permission is off'}
        </Text>

        <Text style={styles.permissionText}>
          {location.latitude && location.longitude
            ? `Your Location: ${location.latitude}, ${location.longitude}`
            : 'Please enable location permission to explore and continue'}
        </Text>

        <CustomButton
          title={location ? 'Continue' : 'Enable Location'}
          onPress={() => {
            if (!location) {
              checkLocationPermission();
              checkGPSEnabled();
            } else {
              navigation.navigate('Login');
            }
          }}
          colors={['#FF6B5E', '#FF6B5E']}
          style={styles.enableButton}
          textStyle={styles.enableButtonText}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#006D6F' },
  sidebar: { width: width * 0.65, marginTop: 50, backgroundColor: '#006D6F', alignItems: 'center', padding: 20 },
  logo: { width: 218, height: 129 },
  menuItem: { flexDirection: 'row', alignItems: 'center', width: width * 0.8 },
  icon: { width: 35, height: 35, margin: 10, tintColor: '#E0E0E0' },
  menuText: { color: '#E0E0E0', fontSize: 18, fontWeight: 'bold' },
  bgImage: { position: 'absolute', bottom: 0, width: width * 0.88, height: height * 0.49, alignItems: 'center', resizeMode: 'cover' },
  curveImage: { position: 'absolute', left: 157, top:2, alignItems: 'center', resizeMode: 'contain' },
  locationIcon: { width: 100, height: 100, marginTop: 45, marginBottom: 15 },
  permissionTitle: { fontSize: 25, fontWeight: 'bold', color: '#000', marginBottom: 30 },
  enableButton: { backgroundColor: '#FF6F61', width: width * 0.75, marginTop: 35, borderRadius: 20 },
});

export default OnboardingScreen;
