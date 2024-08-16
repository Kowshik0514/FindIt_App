import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#03346E',
          tabBarStyle: { backgroundColor: '#6EACDA' },
          headerShown: false,
          
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                size={focused ? 32 : 24}
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
                size={focused ? 32 : 24}
                color={color}
                // style={focused ? styles.activeTab : {}}
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
                size={focused ? 32 : 24}
                // style={focused ? styles.activeTab : {}}
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
                size={focused ? 32 : 24}
                // style={focused ? styles.activeTab : {}}
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
                size={focused ? 32 : 24}
                // style={focused ? styles.activeTab : {}}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    borderTopWidth: 2, // Add a border at the top
    borderTopColor: 'white', // Color of the border
  },
});
