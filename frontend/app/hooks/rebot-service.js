import { useState, useEffect } from "react";

export function useRebot() {

    console.log("connected")

    const rebot = {
        _id: 2,
        name: "rebot",
        avatar: "https://placeimg.com/140/140/any"
    }

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/rebot/sampleroomname/');

        ws.onopen = () => {
            console.log("WebSocket Opened!");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            const formattedMessage = {
                _id: Date.now(), // Generate a unique ID
                text: data,
                createdAt: new Date().now(),
                user: rebot
            };

            setMessages((prevMessages) => {
                [...prevMessages, formattedMessage]
            });
        };

        ws.onclose = (e) => {
            console.error('Chat socket closed unexpectedly', e);
        };

        return () => {
            ws.close();
        };
    }, []);

    return { messages, setMessages };
}
