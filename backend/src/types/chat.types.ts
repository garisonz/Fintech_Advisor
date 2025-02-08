import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

// Interface for individual messages
interface IMessage {
   timestamp: Date;
   content: string;
}

// Main ChatHistory interface extending Document
export interface IChat extends Document {
   userId: ObjectId;
   messages: IMessage[];
}

// DTO for message creation
export interface MessageDto {
   timestamp?: Date;    // Optional since it has a default value
   content: string;
}

// DTO for creating a new chat history
export interface CreateChat {
   userId: string;      // String for API requests
   messages: MessageDto[];
}

// DTO for updating chat history (all fields optional)
export interface UpdateChat extends Partial<CreateChat> {
   // Additional method to add a single message
   newMessage?: MessageDto;
}