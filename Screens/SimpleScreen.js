import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'
import Frame from '../Assets/Frame.png'
import { useEffect } from 'react'

const simpleScreen = ({navigation}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Register')
        },2000)

        return () => clearTimeout(timer);
    },[navigation])

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Image source={Frame}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#262262',
      alignItems: 'center', 
      justifyContent: 'center', 
    },
    centered: {
      alignItems: 'center', 
      justifyContent: 'center', 
    },
  });

export default simpleScreen