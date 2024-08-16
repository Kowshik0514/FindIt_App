import { View, Text } from 'react-native'
import { Stack } from 'expo-router';
import React from 'react'

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <Stack>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  )
}

export default index