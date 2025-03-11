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
import Welcome from './app/screens/welcome';
import Login from './app/screens/Login';
import ForgotPassword from './app/screens/ForgotPassword';
import SignupStepOne from './app/screens/signupStepOne';
import SignupStepTwo from './app/screens/signupStepTwo';
import RebotWelcome from './app/screens/RebotWelcome';
import RebotChatInterface from './app/screens/RebotChatInterface';
import { ThemeProvider, useThemeToggle } from './app/theme-context';
import { Avatar } from '@rneui/base';

const LoginStack = createNativeStackNavigator();
function LoginNavigator() {
  return (
    <LoginStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name="Welcome" component={Welcome} />
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <LoginStack.Screen name="SignupStepOne" component={SignupStepOne} />
      <LoginStack.Screen name="SignupStepTwo" component={SignupStepTwo} />
      <LoginStack.Screen name="MainApp" component={BottomTabNavigator} />
    </LoginStack.Navigator>
  )
}

const RebotStack = createNativeStackNavigator();
function RebotNavigator() {
  return (
    <RebotStack.Navigator screenOptions={{ headerShown: false }}>
      <RebotStack.Screen name="RebotWelcome" component={RebotWelcome} />
      <RebotStack.Screen name="RebotChatInterface" component={RebotChatInterface} />
    </RebotStack.Navigator>
  );
}

const BottomTabStack = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTabStack.Navigator
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
        tabBarShowLabel: false,
        tabBarPressColor: "transparent",
        tabBarStyle: {
          padding: 16
        },

        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
        }
      })}
    >
      <BottomTabStack.Screen name="Home" component={Home} />
      <BottomTabStack.Screen name="Tasks" component={Tasks} />
      <BottomTabStack.Screen name="Rebot" component={RebotNavigator} />
      <BottomTabStack.Screen name="Community" component={Community} />
    </BottomTabStack.Navigator>
  );
}


/*  App Start Point
   ----------------  */

function AppContent() {
  const { loggedIn } = useLogin();
  const { theme } = useThemeToggle();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <NavigationContainer theme={theme}>
        {loggedIn ? <BottomTabNavigator /> : <LoginNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
