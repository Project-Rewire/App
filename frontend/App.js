import React from 'react';

import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Icon } from './app/fragments/icon';

import Home from './app/screens/tabs/Home';
import Tasks from './app/screens/tabs/Tasks';
import Community from './app/screens/tabs/Community';
import ReBot from './app/screens/tabs/ReBot';

const BottomTab = createBottomTabNavigator();

const BottomTabGroup = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          let iconLib = "ionicon";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Tasks") {
            iconName = focused ? "file-tray-full" : "file-tray-full-outline";
          } else if (route.name === "Community") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "MoreStack") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "ReBot") {
            iconName = focused ? "robot-happy" : "robot-happy-outline";
            iconLib = "materialcommunityicons";
          }
          return <Icon name={iconName} type={iconLib} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
      })}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Tasks" component={Tasks} />
      <BottomTab.Screen name="Community" component={Community} />
      <BottomTab.Screen name="ReBot" component={ReBot} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <BottomTabGroup />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
