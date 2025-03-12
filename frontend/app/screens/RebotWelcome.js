import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RebotWelcome() {
    const navigation = useNavigation();

    const handleNewConversation = () => {
        navigation.navigate('RebotChatInterface');
    };

    const handlePreviousConversations = () => {
        console.log("Pressed Previous Conversations");
    };

    return (
        <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'space-evenly' }}>

            {/* Illustration container */}
            <Image
                source={require('../assets/chatbot-healthcare-vector-v2.png')}
                resizeMode="contain"
                style={{
                    height: '30%'
                }}
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
};

const styles = StyleSheet.create({
    illustrationContainer: {
        width: '100%',
        height: "45%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtons: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: "100%"
    },
    newConversationButton: {
        backgroundColor: '#16837D',
        width: '100%',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
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