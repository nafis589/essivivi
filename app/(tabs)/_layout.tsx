import { Palette } from '@/constants/theme';
import { TourProvider } from '@/features/tour/context/TourContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <TourProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Palette.primary,
          tabBarInactiveTintColor: Palette.textGray,
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </TourProvider>
  );
}
