import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const otpInputs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== '' && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    } else if (text === '' && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch('https://api-coolbro.gvmtechnologies.com/auth/verify_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otp.join('')
        })
      });

      if (response.status === 200) {
        Alert.alert('OTP verified successfully');
      }

      const data = await response.json();
      if (data === 'success') {
        Alert.alert('OTP verified successfully');
      } else {
        setError('Error verifying OTP. Please try again.');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('Error verifying OTP. Please try again.');
    }
  };

  const resendOTP = async () => {
    try {
      const response = await fetch('https://api-coolbro.gvmtechnologies.com/auth/resend_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Optionally, you can send additional data like phone number if needed
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Optionally, you can display a message to inform the user that the OTP has been resent
      Alert.alert('OTP resent successfully');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Optionally, you can display an error message to inform the user that OTP resend failed
      setError('Error resending OTP. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#262262' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../Assets/3dmobile.png')} />
        <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 24 }}>OTP Verification</Text>
        <Text style={{ color: '#FFFFFF', fontWeight: '400', fontSize: 16, marginTop: 20 }}>We have sent an OTP to your phone number !</Text>

        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent:'space-between' }}>
          {otp.map((value, index) => (
            <TextInput
              ref={ref => otpInputs.current[index] = ref}
              key={index}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                borderColor: otpInputs.current[index]?.isFocused() ? '#FFFFFF' : '#CCCCCC', // Highlight border if focused
                borderWidth: 1,
                color: '#FFFFFF',
                textAlign: 'center',
                marginHorizontal: 5,
                fontSize: 16
              }}
              value={value}
              onChangeText={text => handleOtpChange(text, index)}
              maxLength={1}
              keyboardType="numeric"
              onFocus={() => {
                // Highlight border when focused
                const newOtpInputs = [...otpInputs.current];
                newOtpInputs[index].focus();
                otpInputs.current = newOtpInputs;
              }}
            />
          ))}
        </View>

        {error !== '' && (
          <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
        )}

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={{ fontWeight: '400', fontSize: 16, color: '#FFFFFF' }}>Didn't receive OTP ? </Text>
          <TouchableOpacity onPress={resendOTP}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#25AAE1' }}>Resend OTP</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={verifyOTP} style={{
          backgroundColor: '#FFFFFF', paddingHorizontal: 20,
          paddingVertical: 10, borderRadius: 5, width: '80%', borderRadius: 20, marginTop: 100, height: 50, justifyContent: 'center', alignItems: 'center'
        }}>
          <Text style={{ color: '#262262' }}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;
