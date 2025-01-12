import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

import Home from './app/screens/Home';
import Tasks from './app/screens/Tasks';
import Community from './app/screens/Community'
import Settings from './app/screens/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {RenderScreen("Home", Home, "home", "home-outline")}
        {RenderScreen("Tasks", Tasks, "file-tray-full", "file-tray-full-outline")}
        {RenderScreen("Community", Community, "people", "people-outline")}
        {RenderScreen("Settings", Settings, "menu", "menu-outline")}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function RenderScreen(
    screenName, 
    screenComponent, 
    defaultIoniconsName, 
    outLinedIoniconsName, 
    otherIcon=null,
    tabBarActiveTintColor='#000',
    tabBarInactiveTintColor='#666'
  ) {
  return (
    <Tab.Screen
      name={screenName}
      component={screenComponent}
      options={{
        tabBarIcon: otherIcon? otherIcon : ({ focused, color, size }) => (
          <Ionicons
            name={focused ? defaultIoniconsName : outLinedIoniconsName}
            size={size}
            color={color}
          />
        ),
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
      }}
    />
  );
}
