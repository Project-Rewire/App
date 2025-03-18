import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRebot } from '../hooks/rebot-service';

const RebotChatInterface = ({ userId = 'default', roomName = 'default' }) => {
    const [message, setMessage] = React.useState('');
    const flatListRef = useRef(null);
    const { messages: chatHistory, isConnected, sendMessage } = useRebot({
        userId,
        roomName
    });

    const handleSend = () => {
        if (sendMessage(message)) {
            setMessage('');
        }
    };

    const renderChatItem = ({ item }) => {
        const isBot = item.sender === 'bot';

        return (
            <View style={[
                styles.messageContainer,
                isBot ? styles.botMessageContainer : styles.userMessageContainer
            ]}>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    };

    useEffect(() => {
        if (flatListRef.current && chatHistory.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [chatHistory]);

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={chatHistory}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContainer}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
            >
                <View style={styles.quickReplies}>
                    <TouchableOpacity style={styles.quickReplyButton} onPress={() => setMessage("Hello")}>
                        <Text style={styles.quickReplyText}>Hello</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickReplyButton} onPress={() => setMessage("How are you?")}>
                        <Text style={styles.quickReplyText}>How are you?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickReplyButton} onPress={() => setMessage("I need help")}>
                        <Text style={styles.quickReplyText}>I need help</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a message..."
                        placeholderTextColor="#8D9093"
                        value={message}
                        onChangeText={setMessage}
                        multiline={false}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, !isConnected && styles.disabledButton]}
                        onPress={handleSend}
                        disabled={message.trim() === '' || !isConnected}
                    >
                        <Text style={styles.sendButtonText}>➤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    connectionStatus: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
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
        marginTop: 'auto',
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