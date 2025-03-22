import { useState, useEffect, useRef } from "react";
import { Alert } from 'react-native';
import { settings } from "../app.settings";

export function useRebot({ userId = 'default', roomName = 'default' }) {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const webSocketRef = useRef(null);

    const connectWebSocket = () => {

        webSocketRef.current = new WebSocket(`${settings.rebotWebsocket.value}/${roomName}/`);

        webSocketRef.current.onopen = () => {
            console.log('WebSocket connection established');
            setIsConnected(true);
        };

        webSocketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message received:', data);

            if (data.type === 'message') {
                const newMessage = {
                    id: Date.now().toString(),
                    sender: data.sender === 'therapist' ? 'bot' : 'user',
                    text: data.content,
                };

                setMessages(prevMessages => [...prevMessages, newMessage]);
            } else if (data.type === 'error') {
                Alert.alert('Error', data.content);

            } else if (data.type === 'system') {
                console.log('System message:', data.content);

            }
        };

        webSocketRef.current.onclose = (event) => {
            console.log('WebSocket connection closed', event.code, event.reason);
            setIsConnected(false);

            // Attempt to reconnect after a delay
            setTimeout(() => {
                connectWebSocket();
            }, 3000);
        };

        webSocketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    useEffect(() => {
        connectWebSocket();
        return () => {
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, [roomName]);

    const sendMessage = (messageText) => {
        if (messageText.trim() === '' || !isConnected) return false;

        // Create user message object
        const userMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: messageText,
        };

        // Add to local chat history
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Send message to WebSocket server
        const messageData = {
            type: 'message',
            content: messageText,
            timestamp: Date.now() / 1000, // Convert to seconds for server compatibility
        };

        webSocketRef.current.send(JSON.stringify(messageData));
        return true;
    };

    return { messages, isConnected, sendMessage };
}