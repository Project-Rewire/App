import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { authService } from '../services/auth-service';

const ResetPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Get token and uid from route params if provided
  const { uidb64, token } = route.params || {};

  // Validate that we have the required parameters
  useEffect(() => {
    if (!uidb64 || !token) {
      Alert.alert(
        'Invalid Link',
        'The password reset link is invalid or has expired.',
        [{ text: 'Go to Login', onPress: () => navigation.navigate('Login') }]
      );
    }
  }, [uidb64, token]);

  const handleResetPassword = async () => {
    // Validate password fields
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your new password');
      return;
    }
    
    if (!confirmPassword.trim()) {
      Alert.alert('Error', 'Please confirm your password');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const response = await authService.resetPassword(uidb64, token, password);
      
      Alert.alert(
        'Success', 
        'Your password has been reset successfully.',
        [{ text: 'Login Now', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Password reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      
      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/resetPassword.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.instructionText}>
        Please create and enter a new password for your account security.
      </Text>

      {/* Password input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your new password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#A9A9A9"
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={showPassword ? require('../assets/eye-open.png') : require('../assets/eye-closed.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor="#A9A9A9"
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Image
            source={showConfirmPassword ? require('../assets/eye-open.png') : require('../assets/eye-closed.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Submit button */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        )}
      </TouchableOpacity>

      {/* Back to login link */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.backToLoginContainer}
        disabled={loading}
      >
        <Text style={styles.backToLoginText}>Back To Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16837D',
    marginTop: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  image: {
    width: '80%',
    height: 200,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    paddingRight: 50, // Space for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#16837D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginContainer: {
    alignItems: 'center',
  },
  backToLoginText: {
    color: '#16837D',
    fontSize: 16,
  },
});

export default ResetPassword;