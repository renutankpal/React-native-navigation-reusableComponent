import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.jpg';
import UserProfile from '../assets/UserProfile.png';

export function DrawerContent(props) {
  const [activeItem, setActiveItem] = useState(''); // State to track the active item

  const menuItems = [
    { label: 'Dashboard', icon: 'home-outline', screen: 'Dashboard' },
    { label: 'Profile', icon: 'person-outline', screen: 'ProfileScreen' },
    { label: 'Settings', icon: 'settings-outline', screen: 'SettingsScreen' },
    { label: 'Notifications', icon: 'notifications-outline', screen: 'Notifications' },
    { label: 'Employee Form', icon: 'document-text-outline', screen: 'EmployeeForm' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* Drawer Header */}
        <View style={styles.drawerHeader}>
        <Image
          source={logo}
            // source={{ uri: 'https://example.com/profile-image.jpg' }} // Replace with the user's profile image URL
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Welcome, User</Text>
        </View>

        {/* Custom Drawer Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.drawerItem,
              activeItem === item.screen && styles.activeDrawerItem,
            ]}
            onPress={() => {
              setActiveItem(item.screen);
              props.navigation.navigate(item.screen);
            }}
          >
            <Icon name={item.icon} size={22} color={activeItem === item.screen ? '#fff' : '#333'} />
            <Text style={[styles.drawerItemLabel, activeItem === item.screen && styles.activeDrawerItemLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          setActiveItem('');
          props.navigation.navigate('Login');
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    flexDirection:'row',
  //  backgroundColor: '#1E90FF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',

  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10, // Space between image and text
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
   // backgroundColor: '#fff',
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    color: '#333',
  },
  activeDrawerItem: {
    backgroundColor: '#1E90FF',
  },
  activeDrawerItemLabel: {
    color: '#fff',
  },
  logoutButton: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutText: {
    color: '#FF6347',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
