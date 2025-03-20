import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { settings } from '../app.settings';

function generateRandomString(length) {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
        result += lowercaseLetters[randomIndex];
    }
    return result;
}

const RebotChatInterface = ({ userId = 'default' }) => {
    const flatListRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef(null);
    const [roomName, setRoomName] = useState(generateRandomString(4))

    useEffect(() => {
        connectWebSocket();

        return () => {
            wsRef.current?.close();
        };
    }, [roomName]);

    const connectWebSocket = () => {
        wsRef.current?.close();

        const url = `${settings.rebotWebsocket.value}/${roomName}/`;
        wsRef.current = new WebSocket(url);

        wsRef.current.onopen = () => {
            setIsConnected(true);
            sendMessage('Hello');
        };

        wsRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                handleIncomingMessage(data);
            } catch (error) {
                console.error('Invalid message format:', error);
            }
        };

        wsRef.current.onerror = () => setIsConnected(false);

        wsRef.current.onclose = () => setIsConnected(false);
    };

    const handleIncomingMessage = (data) => {
        if (data.type === 'message') {
            const newMessage = {
                id: Date.now().toString(),
                sender: data.sender === 'therapist' ? 'bot' : 'user',
                text: data.content,
            };
            setChatHistory((prev) => [...prev, newMessage]);
        } else if (data.type === 'error') {
            Alert.alert('Error', data.content);
        }
    };

    const sendMessage = (text) => {
        if (!text.trim() || !isConnected || !wsRef.current) return false;

        const messageData = {
            type: 'message',
            sender: userId,
            content: text.trim(),
        };

        try {
            wsRef.current.send(JSON.stringify(messageData));
            setChatHistory((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text: text.trim() }]);
            return true;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    };

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={chatHistory}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.sender === 'bot' ? styles.botMessageContainer : styles.userMessageContainer,
                        ]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContainer}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            {!isConnected && (
                <Text style={styles.connectionStatus}>Disconnected. Trying to reconnect...</Text>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
            >
                <View style={styles.quickReplies}>
                    {['Hello', 'How are you?', 'I need help'].map((text) => (
                        <TouchableOpacity key={text} style={styles.quickReplyButton} onPress={() => setMessage(text)}>
                            <Text style={styles.quickReplyText}>{text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a message..."
                        placeholderTextColor="#8D9093"
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, !isConnected && styles.disabledButton]}
                        onPress={() => sendMessage(message) && setMessage('')}
                        disabled={!message.trim() || !isConnected}
                    >
                        <Text style={styles.sendButtonText}>➤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    connectionStatus: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 4
    },
    chatContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    messageContainer: {
        borderRadius: 20,
        padding: 12,
        marginVertical: 4,
        maxWidth: '80%'
    },
    botMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#e1f2f2',
        borderBottomLeftRadius: 4
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#cce6e6',
        borderBottomRightRadius: 4
    },
    messageText: {
        fontSize: 16,
        color: '#333'
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#e1e8e8',
        backgroundColor: '#f2f7f7'
    },
    quickReplies: {
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-around'
    },
    quickReplyButton: {
        backgroundColor: '#e9eef1',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20
    },
    quickReplyText: {
        color: '#333'
    },
    inputRow: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        backgroundColor: '#e9eef1',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333'
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 16,
        backgroundColor: '#2D7A7A',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8
    },
    disabledButton: {
        backgroundColor: '#a0a0a0'
    },
    sendButtonText: {
        color: 'white',
        fontSize: 18
    },
});

export default RebotChatInterface;
