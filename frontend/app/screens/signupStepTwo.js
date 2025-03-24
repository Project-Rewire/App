import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import axios from 'axios';
import { settings } from '../app.settings';

const SignupStepTwo = ({ navigation, route }) => {
    const { firstName, lastName, username } = route.params || {};
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleSignup = async () => {
        if (!email.trim() || !password.trim() || !confirmPassword.trim() || password !== confirmPassword || !agreeToTerms) {
            return;
        }

        try {
            const response = await axios.post(settings.authEndpoints.value.signupStepTwo, {
                email,
                password,
                confirm_password: confirmPassword,
                first_name: firstName,
                last_name: lastName,
                user_name: username
            });
            if (response.data.message === 'User created successfully') {
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>SignUp</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/signup.png')} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#B8B8B8"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#B8B8B8"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholderTextColor="#B8B8B8"
                />
            </View>
            <View style={styles.termsContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={() => setAgreeToTerms(!agreeToTerms)}>
                    <View style={[styles.checkboxInner, agreeToTerms && styles.checkboxChecked]} />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    By creating an account your agree to our{' '}
                    <Text style={styles.termsLink}>Term and Conditions</Text>
                </Text>
            </View>
            <View style={styles.progressContainer}>
                <View style={styles.progressIndicatorInactive} />
                <View style={styles.progressIndicatorActive} />
            </View>
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Signup</Text>
            </TouchableOpacity>
            <View style={styles.signInContainer}>
                <Text style={styles.accountText}>Have an Account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signInText}>Sign in here</Text>
                </TouchableOpacity>
            </View>
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