import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Linking} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';

interface Contact {
  id: string;
  category: string;
  name: string;
  phone: string;
}

const contacts: Contact[] = [
  {
    id: '1',
    category: '2-4 Wheeler Puncture',
    name: 'Shafi',
    phone: '7975243964',
  },
  {id: '2', category: 'Laundry', name: 'Ashok', phone: '7975243964'},
];

const YellowPage = () => {
  const navigation = useNavigation();
  const makeCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader
        title="Community Directory"
        onBackPress={() => navigation.goBack()}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>

      {/* Directory List */}
      {contacts.map((item, index) => (
        <View key={index}>
          <Text style={styles.category}>{item.category}</Text>
          <View style={styles.card}>
            <Text style={styles.contactName}>
              {item.name} {item.phone}
            </Text>
            <TouchableOpacity onPress={() => makeCall(item.phone)}>
              <Icon name="call" size={20} color="#A3B943" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default YellowPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  addButton: {
    backgroundColor: '#FF6B6B',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginLeft: 20,
  },
  card: {
    backgroundColor: '#E6F2F1',
    marginHorizontal: 20,
    marginTop: 5,
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactName: {
    fontSize: 14,
    color: '#333',
  },
});
