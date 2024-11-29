import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import logo from '../assets/logo.jpg';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailBorderColor, setEmailBorderColor] = useState('#ccc'); // Initial border color
    const [passwordBorderColor, setPasswordBorderColor] = useState('#ccc'); // Initial border color
    const navigation = useNavigation(); 

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailBorderColor(value ? '#1E90FF' : '#ccc'); // Change to blue if not empty, else default gray
    };

    // Update border color when password is entered
    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordBorderColor(value ? '#1E90FF' : '#ccc'); // Change to blue if not empty, else default gray
    };

    return (
        <View style={styles.container}>
            <Animatable.Image
                animation="zoomInUp"
                duration={2000}
                source={logo}
                style={styles.logo}
                resizeMode="contain"
            />
            <TextInput
                style={[styles.input, { borderColor: emailBorderColor }]} // Dynamically change the border color
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
            />
            <TextInput
                style={[styles.input, { borderColor: passwordBorderColor }]} // Dynamically change the border color
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
            />
            <CustomButton
                title="Login"
                onPress={() => navigation.navigate('Dashboard')}
                style={{ width: '100%' }} 

            />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', padding: 20 },
    logo: { width: 200, height: 150, marginVertical: 20 },
    input: { 
        width: '100%', 
        padding: 15, 
        borderWidth: 1.5, 
        borderRadius: 5, 
        marginBottom: 10,
    },
    button: { backgroundColor: '#1E90FF', padding: 15, width: '100%', borderRadius: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    link: { marginTop: 15, color: '#1E90FF' },
});
