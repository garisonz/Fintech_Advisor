// src/models/chat-history.model.ts
import mongoose, { Schema } from 'mongoose';
import { IChat } from '../types/chat.types';

const ChatSchema = new Schema<IChat>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    messages: [{
        timestamp: { 
            type: Date, 
            default: Date.now 
        },
        content: { 
            type: String, 
            required: true 
        }
    }]
}, {
    timestamps: true
});

export default mongoose.model<IChat>("Chat", ChatSchema);