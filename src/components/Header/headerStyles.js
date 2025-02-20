import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007B7F',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 50, // To accommodate status bar
  },
  locationIcon: {
    fontSize: 25,
    color: '#FF6B5E',
   // paddingHorizontal: 20,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
    flex: 1,
  },
  menuIcon: {
    fontSize: 24,
    color: '#fff',
  },
});

export default headerStyles;
