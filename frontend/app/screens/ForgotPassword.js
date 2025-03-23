import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { settings } from '../app.settings';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(settings.authEndpoints.value.forgotPassword, { email });
            if (response.data.message === 'Password reset link sent to email') {
                alert('Password reset link sent to your email.');
            }
        } catch (error) {
            console.error('Password reset failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/forgot-password-illustration.png')} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.instructionText}>
                Please enter the email address you'd like your password information sent to
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                <Text style={styles.resetButtonText}>REQUEST RESET LINK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backToLoginContainer}>
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
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#F8F8F8',
    },
    resetButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#16837D',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    resetButtonText: {
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

export default ForgotPassword;