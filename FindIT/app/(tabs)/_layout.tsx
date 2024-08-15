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
                color={color}
                // style={focused ? styles.activeTab : {}}
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
                size={focused ? 28 : 24}
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
              <TabBarIcon
                name={focused ? 'alert-circle' : 'alert-circle-outline'}
                color={color}
                size={focused ? 28 : 24}
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
              <TabBarIcon
                name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'}
                color={color}
                size={focused ? 28 : 24}
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
                size={focused ? 28 : 24}
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
