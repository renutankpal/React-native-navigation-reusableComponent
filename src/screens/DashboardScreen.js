import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Easing, TextInput, FlatList, Image, Dimensions
} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';
import EmployeeForm from '../components/EmployeeForm';
import { KeyboardAvoidingView } from 'react-native';

const { width } = Dimensions.get('window');
const slideAnim = new Animated.Value(300); // Initial position off-screen

const DashBoardtabs = [
  {
    id: 1,
    name: 'DMS Dashboard',
  },
  {
    id: 2,
    name: 'LMS Dashboard',
  },
  {
    id: 3,
    name: 'QMS Dashboard',
  },
  {
    id: 4,
    name: 'MY DMS',
  },
  {
    id: 5,
    name: 'MY Tasks',
  },
];
const TMSDATA = ['All Records', 'Employee Module', 'QMS Dashboard', 'MY DMS',]

const courses = [
  { id: '1', name: 'Course 1', image: require('../assets/Rectangle32.png') }, // Local asset
  { id: '2', name: 'Course 2', image: require('../assets/Rectangle30.png') }, // Local asset
  { id: '3', name: 'Course 3', image: require('../assets/Rectangle32.png') },
  { id: '4', name: 'Course 4', image: require('../assets/Rectangle30.png') },
  { id: '5', name: 'Course 5', image: require('../assets/Onboarding4.png') },
  { id: '6', name: 'Course 6', image: require('../assets/Onboarding1.png') },
  { id: '7', name: 'Course 7', image: require('../assets/Rectangle32.png') },
  { id: '8', name: 'Course 8', image: require('../assets/Rectangle30.png') },
  { id: '9', name: 'Course 7', image: require('../assets/Rectangle32.png') },
  { id: '10', name: 'Course 7', image: require('../assets/Rectangle32.png') },
];

export default function DashboardScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCat, setSelectedCat] = useState(1);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleForm = () => setIsFormVisible(!isFormVisible);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const handleOpenMenu = () => {
    setIsMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Slide into view
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleCloseMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 300, // Slide out of view
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setIsMenuVisible(false));
  };

  const handleOptionSelect = (form) => {
    // console.log(form);
    setSelectedForm(form);
    setIsMenuVisible(false);

    // handleCloseMenu(); 
  };

  // const handleOptionSelect = (form) => {
  //   setSelectedForm(form);
  //   setIsMenuVisible(false); // Hide menu when an option is selected
  // };


  const handleSubmit = () => {
    console.log('Form submitted!');
    console.log(`Submitted ${selectedForm} form`);

    setSelectedForm(null);
    // setIsFormVisible(false); 
  };
  const renderForm = () => {
    switch (selectedForm) {
      case 'Employee':
        navigation.navigate('EmployeeForm');
        break;
     
      case 'Training Module':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Training Module Form</Text>
            <TextInput style={styles.formInput} placeholder="Module Name" />
            <TextInput style={styles.formInput} placeholder="Duration" />
            <CustomButton title="Submit" onPress={handleSubmit} />
          </View>
        );
      case 'Trainer Qualification':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Trainer Qualification Form</Text>
            <TextInput style={styles.formInput} placeholder="Qualification" />
            <TextInput style={styles.formInput} placeholder="Experience (Years)" />
            <CustomButton title="Submit" onPress={handleSubmit} />
          </View>
        );
      case 'Trainer Verification':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Trainer Verification Form</Text>
            <TextInput style={styles.formInput} placeholder="Trainer ID" />
            <TextInput style={styles.formInput} placeholder="Verification Details" />
            <CustomButton title="Submit" onPress={handleSubmit} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <CommonHeader
        title="Dashboard"
        onMenuPress={() => navigation.openDrawer()}
        onRightPress={() => navigation.navigate('Notifications')}
      />
      <LinearGradient
        colors={['#4c669f', '#00BFFF']}
        style={styles.floatingButton}
      >
        <TouchableOpacity onPress={handleOpenMenu} >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="#4c669f" style={styles.icon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search courses"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DashBoardtabs}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.tabContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedTab(index)}
              style={styles.tabTouchable}
            >
              <LinearGradient
                colors={selectedTab === index ? ['#4c669f', '#00BFFF'] : ['#e0e0e0', '#e0e0e0']}
                style={[
                  styles.tabGradient,
                  selectedTab === index && styles.selectedTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === index && styles.selectedTabText,
                  ]}
                >
                  {item.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>


      {renderForm()}
      {/* Course Grid */}
      <View style={{ flexDirection: 'row', margin: 12, justifyContent: 'space-between' }}>
        <Text style={styles.courseName}>LMS Dashboard</Text>
        <Text style={styles.courseName}>See All Records</Text>
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {typeof item.image === 'string' ? (
              <Image source={{ uri: item.image }} style={styles.courseImage} />
            ) : (
              <Image source={item.image} style={styles.courseImage} />
            )}
            <Text style={styles.courseName}>{item.name}</Text>
            <Text style={styles.courseSubTitle}>{item.name}</Text>
            <Text style={styles.courseSubTitle}>{item.name}</Text>
          </View>
        )}
        style={styles.grid}
      />

      {isMenuVisible && (
        <Modal transparent={true} visible={isMenuVisible} animationType="none">
          <TouchableOpacity
            style={styles.overlay}
            onPress={handleCloseMenu}
            activeOpacity={1}
          />
          <Animated.View
            style={[styles.menuContainer, { transform: [{ translateY: slideAnim }] }]}>
            <ScrollView>
              <Text style={[styles.menuText, { margin: 20 }]}>Choose an option :-</Text>
              <TouchableOpacity style={styles.menuOption} onPress={() => handleOptionSelect('Employee')}>
                <Icon name="person" size={30} color="#4c669f" style={styles.icon} />
                <Text style={styles.menuText}>Employee</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionSelect('Training Module')}>
                <Icons name="cogs" size={30} color="#4c669f" style={styles.icon} />
                <Text style={styles.menuText}>Training Module Management</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionSelect('Trainer Qualification')}>
                <Icon name="git-merge" size={30} color="#4c669f" style={styles.icon} />
                <Text style={styles.menuText} >Training Need Identification(Matrix)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionSelect('Trainer Verification')}>
                <Icons name="account-group" size={30} color="#4c669f" style={styles.icon} />
                <Text style={styles.menuText} >Training Need Identification(Employee)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionSelect('Trainer Qualification')}>
                <Icons name="badge-account-alert" size={30} color="#4c669f" style={styles.icon} />
                <Text style={styles.menuText}>Trainer Qualification(Employee)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionSelect('Trainer Qualification')}>
                <Icons name="calendar-check" size={30} color="#4c669f" style={styles.icon} />
                <Text style={styles.menuText} >Training Plan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={() => handleOptionSelect('Training Module')}>
                <Icons name="calendar-month" size={30} color="#4c669f" style={styles.icon} />
                <Text style={styles.menuText}>Yearly Training Planner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={() => handleOptionSelect('Trainer Qualification')}>
                <Icons name="office-building" size={30} color="#4c669f" style={styles.icon} />
                <Text style={styles.menuText} >Department Wise Employees Job Role</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    padding: 1,
    width: '92%',
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    margin: 20,
  },
  icon: {
    marginRight: 10,
    alignItems: 'center'
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
    height: 45,
    fontSize: 16,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tabTouchable: {
    marginRight: 10, // Add spacing between tabs
    borderRadius: 10,
    overflow: 'hidden',
  },
  tabGradient: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedTab: {
    elevation: 5, // Adds a shadow effect for the selected tab
  },
  tabText: {
    fontSize: 14,
    color: '#000',
  },
  selectedTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 5,
    position: 'relative',
    marginVertical: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    padding: 15,
  },
  courseImage: {
    width: 145,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    // textAlign: 'center',
    color: '#333',
  },
  courseSubTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: '#cccccc',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 50,
    zIndex: 1,
    right: 20,
    backgroundColor: '#4285F4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    //  borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    // maxHeight: '50%',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  //floatingButton: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20, right: 20 },
    menuText:{fontSize:15,color:'#000000',fontWeight:'700',margin:5},
  menuOption: { alignItems:'center', padding: 10, margin: 10, borderRadius: 8, flexDirection: 'row', backgroundColor: '#f5f5f5', fontSize: 16, elevation: 5, },
  formContainer: { marginTop: 20, padding: 20, borderRadius: 8, },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  formInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },

  submitButton: {
    backgroundColor: '#4274DA',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
