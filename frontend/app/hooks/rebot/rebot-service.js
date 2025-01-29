import { useState, useEffect } from "react";

export function useRebot() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'I am the sender',
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