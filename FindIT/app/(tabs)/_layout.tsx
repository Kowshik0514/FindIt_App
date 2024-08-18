import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MarkerProvider } from './props/MarkerContext';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MarkerProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#03346E',
            tabBarInactiveTintColor: 'grey',
            tabBarStyle: { backgroundColor: 'white' },
            tabBarLabelStyle: { marginBottom: 6 }, // Adjust this value to move the labels up
            headerShown: false,
          }}>
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',

              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? 'home' : 'home-outline'}
                  size={focused ? 24 : 20}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Explore',
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  name={focused ? 'briefcase-search' : 'briefcase-search-outline'}
                  size={focused ? 24 : 20}
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
                <MaterialCommunityIcons
                  name={focused ? 'map-marker-question' : 'map-marker-question-outline'}
                  color={color}
                  size={focused ? 24 : 20}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="found"
            options={{
              title: 'Found',
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  name={focused ? 'store-search' : 'store-search-outline'}
                  color={color}
                  size={focused ? 24 : 20}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? 'person' : 'person-outline'}
                  color={color}
                  size={focused ? 24 : 20}
                />
              ),
            }}
          />
        </Tabs>
      </MarkerProvider>
    </SafeAreaView>
  );
}
