import React, { useState } from 'react';
import { Image, TouchableOpacity, Text, View, TextInput, Alert } from 'react-native';
import axios from 'axios'; // Import Axios for making HTTP requests
import Cool from '../Assets/Cool.png';
import Buttons from '../Assets/Google.png';
import Apple from '../Assets/Apple.png';
import Facebook from '../Assets/Facebook.png';
import Login from '../Screens/Login';

const Welcomepage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = () => {
    axios.post('https://api-coolbro.gvmtechnologies.com/auth/register/', {
      Name: name,
      Email: email,
      Login_type: 0,
      Role: 'User'
    })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          Alert.alert('Success', 'Registration successful');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Registration failed');
        }
      })
      .catch(error => {
        console.error('Error registering user:', error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      });
  };


  return (
    <View style={{ backgroundColor: '#262262', flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 70 }}>
        <Image source={Cool} />
      </View>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFFFFF' }}>Register</Text>
      </View>
      <View style={{ alignItems: 'center', fontSize: 15, marginTop: 50 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 20, marginLeft: 20, marginRight: 20 }}>Just fill up details below and you are good to go!</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={{ marginLeft: 10 }}>
          <TextInput
            placeholder="Name"
            placeholderTextColor={'#FFFFFF'}
            value={name}
            onChangeText={text => setName(text)}
            color='white'
          />
        </View>
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
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={{ fontSize: 20, color: '#FFFFFF' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>Or continue with</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
        <View >
          <TouchableOpacity>
            <Image source={Buttons} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <Image source={Facebook} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <Image source={Apple} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#FFFFFF', fontSize: 15 }}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcomepage;
