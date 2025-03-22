import React from 'react';
import { Icon } from './app/fragments/icon';
import { useLogin } from './app/hooks/login-service';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useThemeToggle } from './app/hooks/theme-service';
import { SafeAreaView, Platform, StatusBar } from 'react-native';

import Home from './app/screens/tabs/Home';
import Login from './app/screens/Login';
import Tasks from './app/screens/tabs/Tasks';
import Welcome from './app/screens/welcome';
import Community from './app/screens/tabs/Community';
import RebotWelcome from './app/screens/RebotWelcome';
import SignupStepOne from './app/screens/signupStepOne';
import SignupStepTwo from './app/screens/signupStepTwo';
import ForgotPassword from './app/screens/ForgotPassword';
import RebotChatInterface from './app/screens/RebotChatInterface';
import Settings from './app/screens/Settings';
import About from './app/screens/About';
import PrivacyPolicy from './app/screens/PrivacyPolicy';
import TermsAndConditions from './app/screens/TermsAndConditions';
import RebotChatSelection from './app/screens/RebotChatSelection';
import Profile from './app/screens/Profile';
import MotivationalContent from './app/screens/MotivationalContent';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { loggedIn } = useLogin();
  const { theme } = useThemeToggle();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <NavigationContainer theme={theme}>
        {loggedIn ? <BottomTabNavigator /> : <LoginNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const BottomTabStack = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          let iconLib = 'ionicon';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Tasks':
              iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
              break;
            case 'Community':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Rebot':
              iconName = focused ? 'robot-happy' : 'robot-happy-outline';
              iconLib = 'materialcommunityicons';
              break;
            default:
              iconName = 'menu';
          }

          return <Icon name={iconName} type={iconLib} size={size} color={color} />;
        },
        tabBarShowLabel: true,
        tabBarPressColor: 'transparent',
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 20 },
      })}
    >
      <BottomTabStack.Screen name="Home" component={HomeNavigator} />
      <BottomTabStack.Screen name="Tasks" component={Tasks} />
      <BottomTabStack.Screen name="Rebot" component={RebotNavigator} />
      <BottomTabStack.Screen name="Community" component={Community} />
    </BottomTabStack.Navigator>
  );
}

const LoginStack = createNativeStackNavigator();
function LoginNavigator() {
  return (
    <LoginStack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Welcome" component={Welcome} />
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <LoginStack.Screen name="SignupStepOne" component={SignupStepOne} />
      <LoginStack.Screen name="SignupStepTwo" component={SignupStepTwo} />
      <LoginStack.Screen name="MainApp" component={BottomTabNavigator} />
    </LoginStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <HomeStack.Screen name="MotivationalContentNavigator" component={MotivationalContentNavigator} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();
function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="About" component={About} />
      <SettingsStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <SettingsStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </SettingsStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="SettingsNavigator" component={SettingsNavigator} />
    </ProfileStack.Navigator>
  );
}

const MotivationalContentStack = createNativeStackNavigator();
function MotivationalContentNavigator() {
  return (
    <MotivationalContentStack.Navigator screenOptions={{ headerShown: false }}>
      <MotivationalContentStack.Screen name="Motivational Content" component={MotivationalContent} />
    </MotivationalContentStack.Navigator>
  );
}


const RebotStack = createNativeStackNavigator();
function RebotNavigator() {
  return (
    <RebotStack.Navigator screenOptions={{ headerShown: false }}>
      <RebotStack.Screen name="RebotWelcome" component={RebotWelcome} />
      <RebotStack.Screen name="RebotChatInterface" component={RebotChatInterface} />
      <RebotStack.Screen name="RebotChatSelection" component={RebotChatSelection} />
    </RebotStack.Navigator>
  );
}