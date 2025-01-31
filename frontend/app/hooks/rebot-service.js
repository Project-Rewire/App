import { useState, useEffect } from "react";

export function useRebot() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hi there! How can I assist you today? Feel free to ask anything!',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'sample user',
                    avatar: 'https://placeimg.com/140/140/any',
                }
            },
            {

                _id: 2,
                text: 'Hi Rebot!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'sample user',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    return { messages, setMessages };
}