import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import Cool from '../Assets/Cool.png';
import Buttons from '../Assets/Google.png';
import Apple from '../Assets/Apple.png';
import facebook from '../Assets/Facebook.png';
import Otp from '../Screens/Otp'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        // Make sure email is not empty
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }
        else {
            navigation.navigate(Otp)
        }

        // Make API call
        fetch('https://api-coolbro.gvmtechnologies.com/auth/send_otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: email,
                Login_type: '0'
            })
        })
            .then(response => {
                if (response.ok) {

                    Alert.alert('Success', 'OTP has been sent to your email.');
                    // Reset email input
                    setEmail('');
                } else {

                    Alert.alert('Error', 'Failed to send OTP. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            });
    };

    return (
        <View style={{ backgroundColor: '#262262', flex: 1 }}>
            <View style={{ alignItems: 'center', marginTop: 70 }}>
                <Image source={Cool} />
            </View>
            <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFFFFF' }}>Welcome</Text>
            </View>
            <View style={{ alignItems: 'center', fontSize: 15, marginTop: 50 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 20, marginLeft: 20, marginRight: 20 }}>Login with your phone number and access our services good to go!</Text>
            </View>

            <View style={{ marginTop: 30 }}>
                <View style={{ marginLeft: 10 }}>
                    <TextInput
                        placeholder="Enter Email Address"
                        placeholderTextColor={'#FFFFFF'}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        color='white'
                    />
                </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={{ fontSize: 20, color: '#FFFFFF' }}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 15 }}>Or continue with</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                <View>
                    <TouchableOpacity>
                        <Image source={Buttons} />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <Image source={facebook} />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <Image source={Apple} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                <Text style={{ color: '#FFFFFF', fontSize: 15 }}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
