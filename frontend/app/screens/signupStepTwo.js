import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { authService } from '../services/api-service';
import { useLogin } from '../hooks/login-service';

const SignupStepTwo = ({ navigation, route }) => {
  const { firstName, lastName, username, tempUserId } = route.params || {};

  React.useEffect(() => {
    if (!tempUserId) {
      Alert.alert(
        'Error',
        'Missing user information from step one',
        [{ text: 'Go Back', onPress: () => navigation.goBack() }]
      );
    }
  }, []);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useLogin();

  const handleSignup = async () => {
    // Basic validation
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the terms and conditions');
      return;
    }
    
    // Validate tempUserId
    if (!tempUserId) {
      Alert.alert('Error', 'Missing temporary user ID from step one');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await authService.signupStepTwo({
        temp_user_id: tempUserId,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,        
        confirm_password: confirmPassword  
      });
      
      Alert.alert(
        'Success',
        'Your account has been created successfully!',
        [
          {
            text: 'Login now',
            onPress: async () => {
              try {
                await login(email, password);
              } catch (loginError) {
                navigation.navigate('Login');
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Signup error details:', error);
      const errorMessage = error.error || error.message || 'Registration failed. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      
      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/signup.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      {/* Input Fields */}
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#B8B8B8"
          editable={!isLoading}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#B8B8B8"
          editable={!isLoading}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#B8B8B8"
          editable={!isLoading}
        />
      </View>
      
      {/* Terms and Conditions Checkbox */}
      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          disabled={isLoading}
        >
          <View style={[
            styles.checkboxInner,
            agreeToTerms && styles.checkboxChecked
          ]} />
        </TouchableOpacity>
        
        <Text style={styles.termsText}>
          By creating an account your agree to our{' '}
          <Text 
            style={styles.termsLink}
            onPress={() => navigation.navigate('TermsAndConditions')}
          >
            Term and Conditions
          </Text>
        </Text>
      </View>
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressIndicatorInactive} />
        <View style={styles.progressIndicatorActive} />
      </View>
      
      {/* Signup Button */}
      <TouchableOpacity 
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupButtonText}>Signup</Text>
        )}
      </TouchableOpacity>
      
      {/* Sign In Link */}
      <View style={styles.signInContainer}>
        <Text style={styles.accountText}>Have an Account? </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          disabled={isLoading}
        >
          <Text style={styles.signInText}>Sign in here</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom Line */}
      <View style={styles.bottomLine} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16837D',
    textAlign: 'center',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '70%',
    height: 220,
  },
  inputsContainer: {
    marginTop: 20,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#16837D',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  termsLink: {
    color: '#16837D',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  progressIndicatorActive: {
    width: 40,
    height: 8,
    backgroundColor: '#16837D',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  progressIndicatorInactive: {
    width: 40,
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  signupButton: {
    backgroundColor: '#16837D',
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  accountText: {
    fontSize: 16,
    color: '#333',
  },
  signInText: {
    fontSize: 16,
    color: '#16837D',
  },
  bottomLine: {
    height: 5,
    width: 120,
    backgroundColor: '#000',
    borderRadius: 2.5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 15,
  },
});

export default SignupStepTwo;