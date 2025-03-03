import { useState, useEffect } from "react";

export function useRebot() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/rebot/sampleroomname/');

        ws.onopen = () => {
            console.log("WebSocket Opened!");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.onclose = (e) => {
            console.error('Chat socket closed unexpectedly');
        };

        return () => {
            ws.close();
        };
    }, []);

    return { messages, setMessages };
}
