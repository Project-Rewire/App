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
        <View style={styles.container}>
            <View style={styles.content}>

                {/* Illustration container */}
                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../assets/chatbot-healthcare-vector.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <Text style={styles.title}>Rebot</Text>

                {/* Action buttons */}
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
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    illustrationContainer: {
        width: '100%',
        height: "50%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: '80%',
        height: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#176B87',
        marginBottom: 40,
    },
    newConversationButton: {
        backgroundColor: '#176B87',
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
        color: '#176B87',
        fontSize: 16,
        fontWeight: '500',
    },
});