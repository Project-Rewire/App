import { useState, useEffect } from "react";

export function useRebot() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Receiver',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'sample user',
                    avatar: 'https://placeimg.com/140/140/any',
                }
            },
            {

                _id: 2,
                text: 'Sender',
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