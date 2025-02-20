import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import images from '../images/images'; // Assuming images are imported here

const CommonHeader = ({title, onBackPress, backIcon, iconName = 'arrowleft'}) => {
  return (
    <View style={styles.headerContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          {/* Conditionally render the back icon */}
          <Image
            source={backIcon ? backIcon : images.Arrowuturn} // Use passed backIcon or default to images.Arrowuturn
            style={styles.backButton}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightPlaceholder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#007B7F',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
  },
  headerContent: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'flex-start',
    flex: 1,
  },
  rightPlaceholder: {
    width: 32, // Same width as the back button for alignment
  },
});

export default CommonHeader;
