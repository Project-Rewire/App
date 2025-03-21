// Interfaces
export interface Message {
    id: string;
    conversation_id: string;
    sender: string;
    text: string;
    created_at: number;
}

export interface Conversation {
    id: string;
    created_at: number;
}