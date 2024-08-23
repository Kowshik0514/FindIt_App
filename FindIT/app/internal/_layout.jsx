import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const internal = () => {
  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
        <Stack>
            <Stack.Screen
                name="privacy"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="editprofile"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />    
    </SafeAreaView>    
    </>
  )
}

export default internal