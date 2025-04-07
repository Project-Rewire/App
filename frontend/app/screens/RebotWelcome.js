import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { createConversation, initializeDb } from '../app.db.service';

export default function RebotWelcome() {
    const navigation = useNavigation();
    const { colors } = useTheme();

    // Initialize the database when the component mounts
    useEffect(() => {
        const setupDb = async () => {
            try {
                const success = await initializeDb();
                if (!success) {
                    console.warn("Database initialization may have failed");
                }
            } catch (error) {
                console.error("Failed to initialize database:", error);
            }
        };

        setupDb();
    }, []);

    const handleNewConversation = async () => {
        const generateRandomString = (length) => {
            const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
                result += lowercaseLetters[randomIndex];
            }
            return result;
        };
        const conversationId = generateRandomString(5);
        try {
            // Create a new conversation in the database
            await createConversation({
                conversation: {
                    id: conversationId,
                    created_at: new Date().toISOString(),
                },
                onError: (error) => {
                    console.error('Error creating conversation:', error);
                    Alert.alert('Error', 'Failed to create a new conversation.');
                    return;
                },
            });

            // Navigate to the chat interface with the new conversationId
            navigation.navigate('RebotChatInterface', { conversationId });
        } catch (error) {
            console.error('Error handling new conversation:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    const handlePreviousConversations = () => {
        navigation.navigate('RebotChatSelection');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            {/* Illustration container */}
            <Image
                source={require('../assets/chatbot-healthcare-vector-v3.png')}
                resizeMode="contain"
                style={styles.illustration}
            />

            {/* Action buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.newConversationButton}
                    onPress={handleNewConversation}
                    activeOpacity={0.8}
                >
                    <Text style={styles.newConversationText}>New Conversation</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.previousButton}
                    onPress={handlePreviousConversations}
                >
                    <Text style={styles.previousText}>Previous Conversations</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
    },
    illustration: {
        height: '45%',
        width: '100%',
    },
    actionButtons: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
    },
    newConversationButton: {
        backgroundColor: '#16837D',
        width: '100%',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newConversationText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    previousButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#16837D'
    },
    previousText: {
        color: '#16837D',
        fontSize: 16,
        fontWeight: '500',
    },
});