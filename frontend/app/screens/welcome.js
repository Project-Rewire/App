import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Mock logo component
const Logo = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoCircle}>
      <Text style={styles.logoText}>R</Text>
    </View>
    <Text style={styles.logoFullText}>Rewire</Text>
  </View>
);

// 1. Welcome Screen
const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Logo />
        <Text style={styles.tagline}>Your personalized journey to recovery</Text>
        <Text style={styles.description}>
          Join thousands on their path to recovery with AI-powered support tailored just for you
        </Text>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Privacy')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// 2. Privacy Assurance Screen
const PrivacyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Privacy & Security</Text>
        </View>
        
        <View style={styles.privacyCard}>
          <View style={styles.privacyIconContainer}>
            <Text style={styles.privacyIconText}>🔒</Text>
          </View>
          <Text style={styles.privacyTitle}>Your privacy matters to us</Text>
          <Text style={styles.privacyText}>
            All your data is encrypted and stored securely. Your identity remains anonymous in communities.
          </Text>
          <Text style={styles.privacyText}>
            The information you share is only used to personalize your recovery journey.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Purpose')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.textLink}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Text style={styles.linkText}>Read our full Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// 3. Purpose Selection Screen
const PurposeScreen = ({ navigation }) => {
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  
  const purposes = [
    "I want to overcome an addiction",
    "I'm supporting someone with addiction",
    "I'm exploring options for recovery",
    "Other"
  ];
  
  const [otherReason, setOtherReason] = useState("");
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>What brings you to Rewire?</Text>
        </View>
        
        <ScrollView style={styles.optionsContainer}>
          {purposes.map((purpose, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.optionCard,
                selectedPurpose === index ? styles.selectedOption : {}
              ]}
              onPress={() => setSelectedPurpose(index)}
            >
              <Text style={styles.optionText}>{purpose}</Text>
              {selectedPurpose === index && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          {selectedPurpose === 3 && (
            <TextInput
              style={styles.textInput}
              placeholder="Please specify..."
              value={otherReason}
              onChangeText={setOtherReason}
              multiline
            />
          )}
        </ScrollView>
        
        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.primaryButton,
              styles.nextButton,
              selectedPurpose === null ? styles.disabledButton : {}
            ]}
            disabled={selectedPurpose === null}
            onPress={() => navigation.navigate('AddictionType')}
          >
            <Text style={styles.primaryButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Create the navigator
const Stack = createNativeStackNavigator();

// Main App
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="Purpose" component={PurposeScreen} />
        {/* Additional screens would be added here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
  },
  logoFullText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6200EE',
  },
  secondaryButtonText: {
    color: '#6200EE',
    fontSize: 16,
    fontWeight: '500',
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  privacyCard: {
    backgroundColor: '#F5F5F7',
    padding: 24,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: 'center',
    width: '100%',
  },
  privacyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E1D8F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  privacyIconText: {
    fontSize: 32,
  },
  privacyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  privacyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  textLink: {
    marginTop: 8,
    padding: 8,
  },
  linkText: {
    color: '#6200EE',
    fontSize: 14,
    fontWeight: '500',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: '#F5F5F7',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedOption: {
    backgroundColor: '#EDE7F6',
    borderWidth: 2,
    borderColor: '#6200EE',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    width: '100%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  backButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    flex: 1,
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#DDD',
  }
});

export default App;