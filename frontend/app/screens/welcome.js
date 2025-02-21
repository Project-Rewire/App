import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/Welcome-rafiki.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>WELCOME TO THE APP</Text>
        
        <Text style={styles.description}>
          Welcome! Rewire supports you in building better habits and staying motivated. Let's begin.
        </Text>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  illustration: {
    width: '80%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#1B8484',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountButton: {
    width: '100%',
  },
  createAccountText: {
    color: '#1B8484',
    textAlign: 'center',
    fontSize: 16,
  },
});