import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useLogin } from '../hooks/login-service';
import { useAuth } from '../hooks/jwt-auth-service';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }
        
        setIsLoading(true);
        try {
            await auth.login(email, password);
        } catch (error) {
            Alert.alert('Login Failed', error.message || 'Please check your credentials and try again');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/login-illustration.png')} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#A9A9A9"
                    editable={!isLoading}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#A9A9A9"
                    editable={!isLoading}
                />
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPasswordContainer} disabled={isLoading}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.loginButton, isLoading && styles.disabledButton]} 
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an Account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignupStepOne')} disabled={isLoading}>
                        <Text style={styles.signupLink}>Sign up here</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  image: {
    width: '80%',
    height: 200,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#16837D',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#16837D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#16837D',
    fontSize: 14,
  },
    disabledButton: {
        opacity: 0.7,
    }
});

export default Login;