import React, { useEffect, useRef } from 'react';
import { Icon } from './app/fragments/icon';
import { useLogin } from './app/hooks/login-service';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useThemeToggle } from './app/hooks/theme-service';
import { SafeAreaView, Platform, StatusBar, Linking } from 'react-native';

import Home from './app/screens/tabs/Home';
import Login from './app/screens/Login';
import Tasks from './app/screens/tabs/Tasks';
import Welcome from './app/screens/welcome';
import Community from './app/screens/tabs/Community';
import RebotWelcome from './app/screens/RebotWelcome';
import SignupStepOne from './app/screens/signupStepOne';
import SignupStepTwo from './app/screens/signupStepTwo';
import ForgotPassword from './app/screens/ForgotPassword';
import ResetPassword from './app/screens/ResetPassword';
import RebotChatInterface from './app/screens/RebotChatInterface';
import Settings from './app/screens/Settings';
import About from './app/screens/About';
import PrivacyPolicy from './app/screens/PrivacyPolicy';
import TermsAndConditions from './app/screens/TermsAndConditions';
import { AuthProvider } from './app/hooks/login-service';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { loggedIn } = useLogin();
  const { theme } = useThemeToggle();
  const navigationRef = useRef(null);

  // Configuration for linking
  const linking = {
    prefixes: ['rewire://', 'https://rewire.app', 'http://localhost:8000'],
    config: {
      screens: {
        ResetPassword: {
          path: 'reset_password/:uidb64/:token',
          parse: {
            uidb64: (uidb64) => uidb64,
            token: (token) => token,
          },
        },
      },
    },
  };

  // Handle deep links manually for more control (optional)
  useEffect(() => {
    // Function to handle incoming links
    const handleDeepLink = ({ url }) => {
      if (!url) return;
      
      // Parse the URL to extract the path and parameters
      try {
        const parsedUrl = new URL(url);
        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
        
        // Check if this is a reset password link
        if (pathSegments.length >= 3 && pathSegments[0] === 'reset_password') {
          const uidb64 = pathSegments[1];
          const token = pathSegments[2];
          
          // Navigate to the ResetPassword screen with extracted parameters
          if (navigationRef.current) {
            navigationRef.current.navigate('ResetPassword', { uidb64, token });
          }
        }
      } catch (error) {
        console.error('Error handling deep link:', error);
      }
    };
    
    // Listen for incoming links when the app is already running
    const subscription = Linking.addEventListener('url', handleDeepLink);
    
    // Check for any initial URL used to open the app
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    }).catch(err => {
      console.error('Error getting initial URL:', err);
    });
    
    // Clean up the event listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <NavigationContainer 
        ref={navigationRef}
        theme={theme}
        linking={linking}
      >
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
      <LoginStack.Screen name="ResetPassword" component={ResetPassword} />
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
      <HomeStack.Screen name="SettingsNavigator" component={SettingsNavigator} />
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

const RebotStack = createNativeStackNavigator();
function RebotNavigator() {
  return (
    <RebotStack.Navigator screenOptions={{ headerShown: false }}>
      <RebotStack.Screen name="RebotWelcome" component={RebotWelcome} />
      <RebotStack.Screen name="RebotChatInterface" component={RebotChatInterface} />
    </RebotStack.Navigator>
  );
}