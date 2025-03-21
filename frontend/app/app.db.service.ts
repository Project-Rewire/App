import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import { Message, Conversation } from "./app.db.models";
import { Alert } from "react-native";

const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

useEffect(() => {
    const initializeDb = async () => {
        try {
            const db = await SQLite.openDatabaseAsync('rewire.db');
            setDb(db);

            // Enable WAL mode for better performance
            await db.execAsync('PRAGMA journal_mode = WAL;');

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
        } catch (error) {
            Alert.alert("A error occurred while initializing the database")
        }
    };
    initializeDb();
}, []);

// Add a message to the database
export const addMessage = async ({
    m,
    onError = () => { }
}: {
    m: Message;
    onError?: (error: any) => void;
}) => {
    try {
        if (db) {
            await db.runAsync(
                'INSERT INTO messages (id, conversation_id, sender, text) VALUES (?, ?, ?, ?)',
                [m.id, m.conversation_id, m.sender, m.text]
            );
        }
    } catch (error) {
        console.error('Error adding message to database:', error);
        onError(error);
    }
};

// Retrieve all messages
export const getMessages = async ({
    conversationId,
    onError = () => { }
}: {
    conversationId: string;
    onError?: (error: any) => void;
}) => {
    try {
        if (db) {
            return await db.getAllAsync(
                'SELECT * FROM messages WHERE conversation_id = ?',
                [conversationId]
            );
        }
    } catch (error) {
        console.error('Error retrieving messages from database:', error);
        onError(error);
    }
    return [];
};

// Create a new Conversation in the database
export const createConversation = async ({
    conversation,
    onError = () => { }
}: {
    conversation: Conversation;
    onError?: (error: any) => void;
}) => {
    try {
        if (db) {
            await db.runAsync(
                'INSERT INTO conversations (id, created_at) VALUES (?, ?)',
                [conversation.id, new Date(conversation.created_at).toISOString()]
            );
        }
    } catch (error) {
        console.error('Error creating a conversation in the database:', error);
        onError(error);
    }
};