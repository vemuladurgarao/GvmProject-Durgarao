import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcomepage from './Screens/Welcomepage'
import Login from './Screens/Login'
import Otp from './Screens/Otp'
import Screen from './Screens/SimpleScreen'

const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Simple' component={Screen}>

        </Stack.Screen>

        <Stack.Screen name='Register' component={Welcomepage}>

        </Stack.Screen>
        <Stack.Screen name='Login' component={Login}>

        </Stack.Screen>

        <Stack.Screen name='Otp' component={Otp}>

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App