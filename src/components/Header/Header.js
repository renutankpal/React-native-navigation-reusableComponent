import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import headerStyles from './headerStyles';

const Header = ({ ONPRESS1, ONPRESS2 }) => {
  return (
    <View style={headerStyles.header}>
      <TouchableOpacity onPress={ONPRESS1}>
        <Ionicons name="location" size={30} color="#FF6B5E" />
      </TouchableOpacity>
      <Text style={headerStyles.locationText}>
        Delivery to{'\n'}AB2003, Greenage
      </Text>
      <TouchableOpacity onPress={ONPRESS2}>
        <Ionicons name="person" size={24} color="#fff" style={headerStyles.menuIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
