import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert,ScrollView, StyleSheet, Dimensions, Image, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import images from '../images/images';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../theme/variables/config"; 

import { verifyOtp, sendOtp } from '../redux/slices/authSlice';
import axios from 'axios';

import CustomButton from '../components/CustomButton';
import CommonHeader from '../components/CommonHeader';

const { width } = Dimensions.get('window');


const OtpVerification: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params as { userId: string }; // ✅ Get userId from navigation params
     console.log('userId..',userId);
   
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [timer, setTimer] = useState<number>(30);
    const [isLoading, setIsLoading] = useState(false);
    const otpInputs = useRef<(TextInput | null)[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < otp.length - 1) {
            otpInputs.current[index + 1]?.focus();
        }

        if (index === otp.length - 1 && text) {
            Keyboard.dismiss();
        }
    };

    const handleOtpSubmit = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 4) {
            Alert.alert('Please enter a 4-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/login/customer/verifyOtp`, {
                params: { userId, otp: enteredOtp },
              });
              

            console.log('OTP Verification Response......:', response.data);

            if (response.status === 200 && response.data.sessionId) {
                const { sessionId } = response.data;
                console.log('OTP Verification sessionId......:', response.data.sessionId);

               //  dispatch(setSessionId(sessionId));
                await AsyncStorage.setItem('sessionId', sessionId);

                navigation.navigate('JoinCommunity');
            } else {
                Alert.alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('OTP Verification Error:', error);
            Alert.alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/login/customer/verifyOtp`, {
                params: { userId },
            });
            setTimer(30);
            setOtp(['', '', '', '']);
            otpInputs.current[0]?.focus();
            Alert.alert('OTP resent successfully');
        } catch (error) {
            console.error('Resend OTP Error:', error);
            Alert.alert('Failed to resend OTP. Try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}} >
            <View style={styles.container}>
            <CommonHeader 
            onBackPress={() => navigation.goBack()} 
            backIcon={images.backIcon}  />
            <View style={styles.sidebar}>
                <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                <View style={styles.menuItem}><Image source={images.storeIcon} style={styles.icons} /><Text style={styles.menuText}>Know Your Community</Text></View>
                <View style={styles.menuItem}><Image source={images.homeIcon} style={styles.icons} /><Text style={styles.menuText}>Support Local Businesses</Text></View>
                <View style={styles.menuItem}><Image source={images.giftIcon} style={styles.icons} /><Text style={styles.menuText}>Earn Rewards</Text></View>
            </View>

            <Text style={styles.otpMessage}>We've sent a text message to your mobile number +91 {userId}</Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => (otpInputs.current[index] = el)}
                        style={styles.otpBox}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        returnKeyType="next"
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.timeView} disabled={timer > 0} onPress={handleResend}>
                <Text style={styles.timerText}>{`00:${timer < 10 ? `0${timer}` : timer}`}</Text>
                <Text style={styles.resendText}>
                    Didn't get it? <Text style={styles.resendLink}>Resend</Text>
                </Text>
            </TouchableOpacity>

            <CustomButton
                title={isLoading ? 'Verifying...' : 'Submit'}
                onPress={handleOtpSubmit}
                colors={['#FF6B5E', '#FF6B5E']}
                style={styles.button}
                textStyle={styles.buttonText}
                disabled={isLoading}
            />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    // scrollContainer: {
    //     flexGrow: 1,
    //     justifyContent: 'center', 
    //     alignItems: 'center',
    //     //paddingBottom: 20, 
    // },
    container: {
        flex: 1,
        backgroundColor: '#007B7F',
        alignItems: 'center'
    },
    sidebar: {
        width: width * 0.9,
        marginTop: 10,
        backgroundColor: '#007B7F',
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    otpMessage: {
        textAlign: 'center',
        width: width * 0.8,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 17,
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    otpBox: {
        width: width * 0.16,
        height: width * 0.16,
        backgroundColor: '#ffffff',
        marginHorizontal: 8,
        textAlign: 'center',
        fontSize: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    timeView: {
        width: width * 0.92,
        flexDirection: 'row',
        marginVertical: 20,
    },
    timerText: {
        fontSize: 20,
        width: width * 0.21,

        fontWeight: 'bold',
        color: 'white',
        marginHorizontal: 30,
    },
    resendText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    resendLink: {
        color: '#FF6B5C',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FF6B5B',
        borderRadius: 25,
        width: width * 0.75,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OtpVerification;
