import * as SQLite from 'expo-sqlite';
import { Message, Conversation } from "./app.db.models";

let db: SQLite.SQLiteDatabase | null = null;

export const initializeDb = async () => {
    try {
        // Only initialize if not already initialized
        if (!db) {
            db = await SQLite.openDatabaseAsync('rewire.db');

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

            console.log("Database initialized successfully");
        }
        return true;
    } catch (error) {
        console.error("An error occurred while initializing the database:", error);
        return false;
    }
};

// Add a message to the database
export const addMessage = async ({
    m,
    onError = () => { }
}: {
    m: Message;
    onError?: (error: any) => void;
}) => {
    try {
        if (!db) {
            await initializeDb();
        }

        if (db) {
            await db.runAsync(
                'INSERT INTO messages (id, conversation_id, sender, text) VALUES (?, ?, ?, ?)',
                [m.id, m.conversation_id, m.sender, m.text]
            );
        } else {
            throw new Error("Database not initialized");
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
        if (!db) {
            await initializeDb();
        }

        if (db) {
            return await db.getAllAsync(
                'SELECT * FROM messages WHERE conversation_id = ?',
                [conversationId]
            );
        } else {
            throw new Error("Database not initialized");
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
        if (!db) {
            await initializeDb();
        }

        if (db) {
            await db.runAsync(
                'INSERT INTO conversations (id, created_at) VALUES (?, ?)',
                [conversation.id, new Date(conversation.created_at).toISOString()]
            );
        } else {
            throw new Error("Database not initialized");
        }
    } catch (error) {
        console.error('Error creating a conversation in the database:', error);
        onError(error);
    }
};

// Retrieve all conversations
export const getConversations = async ({
    onError = () => { }
}: {
    onError?: (error: any) => void;
}) => {
    try {
        if (!db) {
            await initializeDb();
        }

        if (db) {
            return await db.getAllAsync(
                'SELECT * FROM conversations'
            );
        } else {
            throw new Error("Database not initialized");
        }
    } catch (error) {
        console.error('Error retrieving conversations from database:', error);
        onError(error);
    }
    return [];
};

// Delete a conversation and its associated messages
export const deleteConversation = async ({
    conversationId,
    onError = () => { }
}: {
    conversationId: string;
    onError?: (error: any) => void;
}) => {
    try {
        if (!db) await initializeDb();

        if (db) {
            await db.runAsync('DELETE FROM conversations WHERE id = ?', [conversationId]);
            await db.runAsync('DELETE FROM messages WHERE conversation_id = ?', [conversationId]);
        } else {
            throw new Error("Database not initialized");
        }
    } catch (error) {
        console.error('Error deleting conversation from database:', error);
        onError(error);
    }
};
