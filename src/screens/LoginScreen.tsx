import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Dimensions, 
    StyleSheet, 
    Image,
    TextStyle,
    ViewStyle,
    ImageStyle 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import images from '../images/images';  
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setPhoneNumber, sendOtp } from '../redux/slices/authSlice';


const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  //  const [phoneNumber, setPhoneNumber] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const phoneNumber = useSelector((state: RootState) => state.auth.phoneNumber);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    
    const handleContinue = () => {
      dispatch(sendOtp(phoneNumber)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigation.navigate('OtpVerification',{userId:phoneNumber});
        }
      });
    };
  
    return (
        <View style={styles.container}>
            {/* Sidebar */}
            <View style={styles.sidebar}>
                <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                
                <View style={styles.menuItem}>
                    <Image source={images.storeIcon} style={styles.icons} />
                    <Text style={styles.menuText}>Know Your Community</Text>
                </View>
                
                <View style={styles.menuItem}>
                    <Image source={images.homeIcon} style={styles.icons} />
                    <Text style={styles.menuText}>Support Local Businesses</Text>
                </View>

                <View style={styles.menuItem}>
                    <Image source={images.giftIcon} style={styles.icons} />
                    <Text style={styles.menuText}>Earn Rewards</Text>
                </View>
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={(text) => dispatch(setPhoneNumber(text.replace(/[^0-9]/g, '').slice(0, 10)))}

                  
                />
            </View>

            {/* Continue Button */}
            <CustomButton 
             title={isLoading ? 'Loading...' : 'Continue'}
            // onPress={handleContinue}
             onPress={()=> navigation.navigate('OtpVerification',{userId:phoneNumber})}
                colors={['#FF6B5E','#FF6B5E']} // Set button gradient color
                style={styles.button} 
                textStyle={styles.buttonText}
            />
            
            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    By continuing, you agree to our{' '}
                    <Text style={styles.footerLink}>Terms of Use</Text> &{' '}
                </Text>
            </View>
            <Text style={styles.footerLink}>Privacy Policy</Text>
        </View>
    );
}

// TypeScript styles
const styles = StyleSheet.create<{
    container: ViewStyle;
    sidebar: ViewStyle;
    logo: ImageStyle;
    menuItem: ViewStyle;
    icons: ImageStyle;
    menuText: TextStyle;
    inputContainer: ViewStyle;
    countryCode: TextStyle;
    input: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
    footer: ViewStyle;
    footerText: TextStyle;
    footerLink: TextStyle;
}>({
    container: { 
        flex: 1, 
        backgroundColor: '#006D6F',
        alignItems: 'center',
    },
    sidebar: {
        width: width * 0.65,
        marginTop: 50,
        backgroundColor: '#006D6F',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 218,
        height: 129,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.8,
    },
    icons: {
        width: 35,
        height: 35,
        margin: 10,
        tintColor: '#E0E0E0',
    },
    menuText: {
        color: '#E0E0E0',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: width * 0.85,
        margin: 20,
    },
    countryCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#000',
    },
    button: {
        backgroundColor: '#FF6B5B',
        borderRadius: 25,
        width: width * 0.82,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        width: width * 0.85,
        flexDirection: 'row',
    },
    footerText: {
        color: '#FFF',
        fontSize: 16,
    },
    footerLink: {
        color: '#FF6B5E',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

