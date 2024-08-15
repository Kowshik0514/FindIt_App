import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'; // Optional, if you need to use it here
import { TabBarIcon } from '@/components/navigation/TabBarIcon'; // Adjust the import path if needed
import { Colors } from '@/constants/Colors'; // Adjust the import path if needed
import { useColorScheme } from '@/hooks/useColorScheme'; // Adjust the import path if needed
import { ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import the icon library

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'magnify' : 'magnify'}
              size={24} // Adjust the size as needed
              color={color}
            />
          ),
        }}
      />
        <Tabs.Screen
          name="lost"
          options={{
            title: 'Lost',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'alert-circle' : 'alert-circle-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="found"
          options={{
            title: 'Found',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
