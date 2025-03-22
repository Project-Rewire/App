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
    ActivityIndicator,
} from 'react-native';
import { settings } from '../app.settings';
import { addMessage, getMessages, initializeDb } from '../app.db.service';

const RebotChatInterface = ({ route, navigation }) => {
    // Extract conversationId from route params
    const { conversationId } = route.params || {};
    const userId = 'default';

    const flatListRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const wsRef = useRef(null);

    // Initialize database on component mount
    useEffect(() => {
        const setup = async () => {
            await initializeDb();
            if (!conversationId) {
                Alert.alert("Error", "No conversation ID provided");
                navigation.goBack();
                return;
            }
            connectWebSocket();
            fetchMessages();
        };

        setup();

        return () => {
            wsRef.current?.close();
        };
    }, [conversationId]);

    const fetchMessages = async () => {
        if (!conversationId) {
            console.error("Cannot fetch messages: No conversation ID");
            return;
        }

        setIsLoading(true);
        try {
            const prevMessages = await getMessages({
                conversationId,
                onError: (error) => {
                    console.error("Error fetching messages:", error);
                    Alert.alert("Error", "Previous conversations could not be loaded");
                }
            });
            setChatHistory(prevMessages || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const connectWebSocket = () => {
        if (!conversationId) {
            console.error("Cannot connect WebSocket: No conversation ID");
            return;
        }

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

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            setIsConnected(false);
            setTimeout(connectWebSocket, 5000);
        };

        wsRef.current.onclose = (event) => {
            console.log("WebSocket closed:", event.code, event.reason);
            setIsConnected(false);
            setTimeout(connectWebSocket, 5000);
        };
    };

    const handleIncomingMessage = (data) => {
        if (!conversationId) {
            console.error("Cannot handle incoming message: No conversation ID");
            return;
        }

        if (data.type === 'message') {
            const newMessage = {
                id: Date.now().toString(),
                conversation_id: conversationId, // Ensure correct field name
                sender: data.sender === 'therapist' ? 'bot' : 'user',
                text: data.content,
                created_at: new Date().toISOString(), // Match database field name
                status: 'delivered',
            };

            setChatHistory((prev) => [...prev, newMessage]);

            // Add message to database
            addMessage({
                m: newMessage,
                onError: (error) => {
                    console.error("Failed to add message to database:", error);
                }
            });
        } else if (data.type === 'error') {
            Alert.alert('Error', data.content);
        }
    };

    const sendMessage = (text) => {
        if (!text.trim() || !isConnected || !wsRef.current || !conversationId) {
            console.log("Cannot send message:", !text.trim() ? "Empty text" : !isConnected ? "Not connected" : !wsRef.current ? "No WebSocket" : "No conversation ID");
            return false;
        }

        const messageData = {
            type: 'message',
            sender: userId,
            content: text.trim(),
        };

        try {
            wsRef.current.send(JSON.stringify(messageData));

            const userMessage = {
                id: Date.now().toString(),
                conversation_id: conversationId, // Ensure correct field name
                sender: 'user',
                text: text.trim(),
                created_at: new Date().toISOString(), // Match database field name
                status: 'sent',
            };

            setChatHistory((prev) => [...prev, userMessage]);

            // Add message to database
            addMessage({
                m: userMessage,
                onError: (error) => {
                    console.error("Failed to add user message to database:", error);
                }
            });

            setMessage('');
            return true;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    };

    useEffect(() => {
        if (flatListRef.current && chatHistory.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [chatHistory]);

    return (
        <>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2D7A7A" />
                </View>
            ) : (
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
                            <Text style={styles.messageTimestamp}>
                                {new Date(item.created_at || item.createdAt).toLocaleTimeString()}
                            </Text>
                            {item.sender === 'user' && (
                                <Text style={styles.messageStatus}>{item.status}</Text>
                            )}
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.chatContainer}
                />
            )}

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
                        onPress={() => sendMessage(message)}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    messageTimestamp: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    messageStatus: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        textAlign: 'right',
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