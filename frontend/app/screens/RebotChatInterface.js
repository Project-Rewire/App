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
import { useThemeToggle } from '../hooks/theme-service';

// Color palette based on #16837D with dark mode variants
const getColors = (isDark) => ({
    primary: '#16837D',
    primary_dark: '#0E6962',
    primary_light: isDark ? '#194A47' : '#E7F5F4',
    accent: '#F28D35',
    accent_light: isDark ? '#3D2A14' : '#FFF4E9',
    background: isDark ? '#121A19' : '#FFFFFF',
    surface: isDark ? '#1A2423' : '#F5F9F9',
    border: isDark ? '#2A3635' : '#D8E6E5',
    text: {
        primary: isDark ? '#E5F0EF' : '#1A3B39',
        secondary: isDark ? '#A2BDBB' : '#5B7876',
        inverse: isDark ? '#121A19' : '#FFFFFF',
        muted: isDark ? '#67817F' : '#8AA6A4',
    },
    error: isDark ? '#FF7B74' : '#E85D55',
    disabled: isDark ? '#3D4A49' : '#B8C9C8',
    success: isDark ? '#3DD9C9' : '#26A69A',
});

const RebotChatInterface = ({ route, navigation }) => {
    const { conversationId } = route.params || {};
    const userId = 'default';
    const { isDark } = useThemeToggle();
    const COLORS = getColors(isDark);

    const flatListRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const wsRef = useRef(null);

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
                conversation_id: conversationId,
                sender: data.sender === 'therapist' ? 'bot' : 'user',
                text: data.content,
                created_at: new Date().toISOString(),
                status: 'delivered',
            };

            setChatHistory((prev) => [...prev, newMessage]);

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
                conversation_id: conversationId,
                sender: 'user',
                text: text.trim(),
                created_at: new Date().toISOString(),
                status: 'sent',
            };

            setChatHistory((prev) => [...prev, userMessage]);

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

    // Dynamic styles based on theme
    const dynamicStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.background,
        },
        connectionStatusContainer: {
            backgroundColor: isDark ? 'rgba(255, 123, 116, 0.15)' : 'rgba(232, 93, 85, 0.1)',
            paddingVertical: 6,
            paddingHorizontal: 12,
        },
        connectionStatus: {
            color: COLORS.error,
            fontSize: 12,
            textAlign: 'center',
        },
        chatContainer: {
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        messageContainer: {
            borderRadius: 20,
            padding: 12,
            marginVertical: 6,
            maxWidth: '80%',
            shadowColor: isDark ? '#000' : '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: isDark ? 0.2 : 0.05,
            shadowRadius: isDark ? 3 : 1,
            elevation: isDark ? 2 : 1,
        },
        botMessageContainer: {
            alignSelf: 'flex-start',
            backgroundColor: COLORS.primary_light,
            borderBottomLeftRadius: 4,
        },
        userMessageContainer: {
            alignSelf: 'flex-end',
            backgroundColor: COLORS.primary,
            borderBottomRightRadius: 4,
        },
        messageText: {
            fontSize: 16,
            lineHeight: 22,
        },
        botMessageText: {
            color: COLORS.text.primary,
        },
        userMessageText: {
            color: COLORS.text.inverse,
        },
        messageTimestamp: {
            fontSize: 11,
            marginTop: 4,
            opacity: 0.8,
        },
        botTimestamp: {
            color: COLORS.text.secondary,
        },
        userTimestamp: {
            color: isDark ? 'rgba(225, 225, 225, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        },
        inputContainer: {
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            backgroundColor: COLORS.surface,
        },
        quickReplies: {
            flexDirection: 'row',
            padding: 8,
            justifyContent: 'space-around',
        },
        quickReplyButton: {
            backgroundColor: isDark ? 'rgba(22, 131, 125, 0.2)' : COLORS.background,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: COLORS.primary,
        },
        quickReplyText: {
            color: isDark ? COLORS.text.primary : COLORS.primary,
            fontWeight: '500',
        },
        inputRow: {
            flexDirection: 'row',
            paddingHorizontal: 12,
            paddingVertical: 10,
            alignItems: 'center',
        },
        input: {
            flex: 1,
            backgroundColor: isDark ? 'rgba(42, 54, 53, 0.8)' : COLORS.background,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: COLORS.border,
            paddingHorizontal: 16,
            paddingVertical: 10,
            fontSize: 16,
            color: COLORS.text.primary,
        },
        sendButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
        },
        disabledButton: {
            backgroundColor: COLORS.disabled,
        },
        sendButtonText: {
            color: COLORS.text.inverse,
            fontSize: 18,
        },
    });

    return (
        <View style={dynamicStyles.container}>
            {isLoading ? (
                <View style={dynamicStyles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={chatHistory}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                dynamicStyles.messageContainer,
                                item.sender === 'bot'
                                    ? dynamicStyles.botMessageContainer
                                    : dynamicStyles.userMessageContainer
                            ]}
                        >
                            <Text
                                style={[
                                    dynamicStyles.messageText,
                                    item.sender === 'bot'
                                        ? dynamicStyles.botMessageText
                                        : dynamicStyles.userMessageText
                                ]}
                            >
                                {item.text}
                            </Text>
                            <Text
                                style={[
                                    dynamicStyles.messageTimestamp,
                                    item.sender === 'bot'
                                        ? dynamicStyles.botTimestamp
                                        : dynamicStyles.userTimestamp
                                ]}
                            >
                                {new Date(item.created_at || item.createdAt).toLocaleTimeString()}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={dynamicStyles.chatContainer}
                />
            )}

            {!isConnected && (
                <View style={dynamicStyles.connectionStatusContainer}>
                    <Text style={dynamicStyles.connectionStatus}>Disconnected. Trying to reconnect...</Text>
                </View>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={dynamicStyles.inputContainer}
            >
                <View style={dynamicStyles.quickReplies}>
                    {['Hello', 'How are you?', 'I need help'].map((text) => (
                        <TouchableOpacity
                            key={text}
                            style={dynamicStyles.quickReplyButton}
                            onPress={() => sendMessage(text)}
                        >
                            <Text style={dynamicStyles.quickReplyText}>{text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={dynamicStyles.inputRow}>
                    <TextInput
                        style={dynamicStyles.input}
                        placeholder="Add a message..."
                        placeholderTextColor={COLORS.text.muted}
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity
                        style={[
                            dynamicStyles.sendButton,
                            !isConnected || !message.trim()
                                ? dynamicStyles.disabledButton
                                : {}
                        ]}
                        onPress={() => sendMessage(message)}
                        disabled={!message.trim() || !isConnected}
                    >
                        <Text style={dynamicStyles.sendButtonText}>➤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default RebotChatInterface;