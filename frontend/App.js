import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

import Home from './app/screens/Home';
import Tasks from './app/screens/Tasks';
import Community from './app/screens/Community'
import More from './app/screens/More';
import Settings from "./app/screens/Settings"

const MoreStack = createNativeStackNavigator()

const MoreStackGroup = () => {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name="More" component={More} />
      <MoreStack.Screen name="Settings" component={Settings} />
    </MoreStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabGroup = () => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({color, focused, size}) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Tasks") {
            iconName = focused ? "file-tray-full" : "file-tray-full-outline";
          } else if (route.name === "Community") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "MoreStack") {
            iconName = focused ? "menu" : "menu-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="MoreStack" component={MoreStackGroup} options={{headerShown:false, tabBarLabel: "More"}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}