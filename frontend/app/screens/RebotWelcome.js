import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createConversation } from '../app.db.service';

const generateRandomString = (length) => {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
        result += lowercaseLetters[randomIndex];
    }
    return result;
};

export default function RebotWelcome() {
    const navigation = useNavigation();

    const handleNewConversation = async () => {
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
        console.log('Pressed Previous Conversations');
        // Navigate to a screen where previous conversations are listed
        navigation.navigate('PreviousConversations');
    };

    return (
        <View style={styles.container}>
            {/* Illustration container */}
            <Image
                source={require('../assets/chatbot-healthcare-vector-v2.png')}
                resizeMode="contain"
                style={styles.illustration}
            />

            {/* Action buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.newConversationButton}
                    onPress={handleNewConversation}
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
        height: '30%',
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
    },
    previousText: {
        color: '#16837D',
        fontSize: 16,
        fontWeight: '500',
    },
});