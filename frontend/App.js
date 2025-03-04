import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from './app/fragments/icon';
import { useLogin } from "./app/hooks/login-service";

import Home from './app/screens/tabs/Home';
import Tasks from './app/screens/tabs/Tasks';
import Community from './app/screens/tabs/Community';
import Rebot from './app/screens/tabs/Rebot';
import Welcome from './app/screens/welcome';
import Login from './app/screens/Login';
import ForgotPassword from './app/screens/ForgotPassword';
import SignupStepOne from './app/screens/signupStepOne';

const Stack = createNativeStackNavigator();
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
          } else if (route.name === "Rebot") {
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
      <BottomTab.Screen name="Rebot" component={Rebot} />
      <BottomTab.Screen name="Community" component={Community} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  const { loggedIn } = useLogin();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {loggedIn ? (
          <BottomTabGroup />
        ) : (
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="SignupStepOne" component={SignupStepOne} />
            <Stack.Screen name="MainApp" component={BottomTabGroup} />
          </Stack.Navigator>
        )}
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