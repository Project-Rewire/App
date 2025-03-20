import React, { useRef, useEffect, useState } from 'react';
import {
    Text,
    View,
    Alert,
    FlatList,
    Platform,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { settings } from '../app.settings';
import * as SQLite from 'expo-sqlite';

const generateRandomString = (length) => {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
        result += lowercaseLetters[randomIndex];
    }
    return result;
};

const RebotChatInterface = ({ userId = 'default' }) => {
    const flatListRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef(null);
    const [conversationId, setConversationId] = useState(generateRandomString(4));
    const [db, setDb] = useState(null);

    useEffect(() => {
        const initializeDb = async () => {
            const db = await SQLite.openDatabaseAsync('chat.db');
            setDb(db);

            // Enable WAL mode for better performance
            await db.execAsync('PRAGMA journal_mode = WAL;');

            // Drop the existing messages table if it exists
            await db.execAsync('DROP TABLE IF EXISTS messages;');

            // Create the conversations table if it doesn't exist
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS conversations (
                    id TEXT PRIMARY KEY NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Create the messages table with the updated schema
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS messages (
                    id TEXT PRIMARY KEY NOT NULL,
                    conversation_id TEXT NOT NULL,
                    sender TEXT NOT NULL,
                    text TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (conversation_id) REFERENCES conversations (id)
                );
            `);

            // Check if the conversation exists, and if not, insert it
            const conversation = await db.getFirstAsync(
                'SELECT * FROM conversations WHERE id = ?',
                [conversationId]
            );
            if (!conversation) {
                await db.runAsync(
                    'INSERT INTO conversations (id) VALUES (?)',
                    [conversationId]
                );
            }

            // Load messages for the current conversation
            const messages = await getMessages();
            setChatHistory(messages);
        };
        initializeDb();
    }, [conversationId]);

    const addMessage = async (m) => {
        try {
            if (db) {
                await db.runAsync(
                    'INSERT INTO messages (id, conversation_id, sender, text) VALUES (?, ?, ?, ?)',
                    [m.id, conversationId, m.sender, m.text]
                );
            }
        } catch (error) {
            console.error('Error adding message to database:', error);
        }
    };

    const getMessages = async () => {
        if (db) {
            return await db.getAllAsync(
                'SELECT * FROM messages WHERE conversation_id = ?',
                [conversationId]
            );
        }
        return [];
    };

    useEffect(() => {
        connectWebSocket();
        return () => {
            wsRef.current?.close();
        };
    }, [conversationId]);

    const connectWebSocket = () => {
        wsRef.current?.close();

        const url = `${settings.rebotWebsocket.value}/${conversationId}/`;
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

        wsRef.current.onerror = () => {
            setIsConnected(false);
            setTimeout(connectWebSocket, 5000);
        };

        wsRef.current.onclose = () => {
            setIsConnected(false);
            setTimeout(connectWebSocket, 5000);
        };
    };

    const handleIncomingMessage = (data) => {
        if (data.type === 'message') {
            const newMessage = {
                id: Date.now().toString(),
                sender: data.sender === 'therapist' ? 'bot' : 'user',
                text: data.content,
            };
            setChatHistory((prev) => [...prev, newMessage]);
            addMessage(newMessage);
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
            const userMessage = { id: Date.now().toString(), sender: 'user', text: text.trim() };
            setChatHistory((prev) => [...prev, userMessage]);
            addMessage(userMessage);
            return true;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    };

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [chatHistory]);

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
                        ]}
                    >
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContainer}
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
                        <TouchableOpacity
                            key={text}
                            style={styles.quickReplyButton}
                            onPress={() => sendMessage(text)}
                        >
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
        paddingVertical: 4,
    },
    chatContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    messageContainer: {
        borderRadius: 20,
        padding: 12,
        marginVertical: 4,
        maxWidth: '80%',
    },
    botMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#e1f2f2',
        borderBottomLeftRadius: 4,
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#cce6e6',
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#e1e8e8',
        backgroundColor: '#f2f7f7',
    },
    quickReplies: {
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-around',
    },
    quickReplyButton: {
        backgroundColor: '#e9eef1',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    quickReplyText: {
        color: '#333',
    },
    inputRow: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#e9eef1',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 16,
        backgroundColor: '#2D7A7A',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    disabledButton: {
        backgroundColor: '#a0a0a0',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default RebotChatInterface;