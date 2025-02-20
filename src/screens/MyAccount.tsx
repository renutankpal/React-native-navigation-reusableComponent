import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import images from '../images/images';
const MyAccount = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader title="Settings" onBackPress={() => navigation.goBack()} />
      <Text style={styles.welcomeText}>Welcome 9731726006</Text>

      {/* Grid Layout for Options */}
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('OrderHistory')}>
          <Image source={images.bag} style={styles.icons} />
          <Text style={styles.cardText}>Order History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Address')}>
          <Image source={images.location} style={styles.icons} />
          <Text style={styles.cardText}>Saved Addresses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Image source={images.users} style={styles.icons} />
          <Text style={styles.cardText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Applycoupon')}>
          <Image source={images.headset} style={styles.icon} />
          <Text style={styles.cardText}>Connect over Whatsapp</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F', // Background Color
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 5,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: '#F5F5F5', // Light Gray Background
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icons: {
    width: 38,
    height: 42,
    marginBottom: 8,
    // tintColor: '#E0E0E0',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  logoutText: {
    color: '#FF6F61',
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid', // Ensures bold underline
  },
});
