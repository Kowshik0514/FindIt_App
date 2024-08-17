import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen
                name="choose"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="signin"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />        
        {/* doubt */}
    </>
  )
}

export default AuthLayout