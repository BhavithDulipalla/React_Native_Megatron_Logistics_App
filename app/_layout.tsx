import { Tabs, Stack } from "expo-router";
import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'SignUp',
          tabBarIcon: () => null,
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>
              Sign Up
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="signIn"
        options={{
          title: 'SignIn',
          tabBarIcon: () => null,
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>
              Sign In
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15
  },
  activeTabLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
});
