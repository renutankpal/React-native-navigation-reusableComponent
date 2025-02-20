import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import ProfileScreen from './ProfileScreen';
import images from '../images/images';
const {width} = Dimensions.get('window');

const businesses = [
  {id: '1', name: 'Sharma’s Paan', image: images.paan},
  {id: '2', name: 'Ikkat', image: images.ghadha},
  {id: '3', name: 'Ekta’s Homemade', image: images.fruits},
  {id: '4', name: 'Fresh Zone', image: images.salads},
];

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        ONPRESS1={() => console.log('Location Pressed')}
        ONPRESS2={() => navigation.navigate('MyAccount')}
      />

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={images.slides}
          style={styles.bannerImage}
        />
        <TouchableOpacity style={styles.exploreButton} 
        onPress={() => navigation.navigate('YellowPage')}
        >
          <Text style={styles.exploreButtonText}>Explore Yellow Page</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separatorBar}></View>

      {/* Business Section */}
      <View style={{backgroundColor: '#E5F2F2'}}>
        <Text style={styles.sectionTitle}>Explore Local Businesses</Text>
        <FlatList
          data={businesses}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.businessCard}
              onPress={() => navigation.navigate('ShopFront')}>
              <Image source={item.image} style={styles.businessImage} />
              <Text style={styles.businessName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.businessList}
          showsVerticalScrollIndicator={false}
        />
      </View>

     
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#E7F3F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#E7F3F5',
  },
  bannerContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  exploreButton: {
    position: 'absolute',
    bottom: 15,
    backgroundColor: '#F76C6C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorBar: {
    backgroundColor: '#007B7F',
    height: 25, // Adjust height to match image
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
  businessList: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  businessCard: {
    width: width * 0.45,
    //  backgroundColor: '#fff',
    borderRadius: 15,
    margin: 8,
    alignItems: 'center',
    padding: 12,
    // elevation: 5, // Shadow for Android
    // shadowColor: '#000', // Shadow for iOS
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // shadowOffset: { width: 0, height: 2 },
  },
  businessImage: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    resizeMode: 'cover', // Make images fit naturally
  },
  businessName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007B7F',
    paddingVertical: 20,
    marginTop: 0,
    paddingHorizontal: 40,
  },
  bottomIcon: {
    fontSize: 28,
    color: '#fff',
  },
});

export default DashboardScreen;
