import Chat from '../models/chat.model';
import { IChat, CreateChat, MessageDto } from '../types/chat.types';

export class ChatService {
   static async createChat(data: CreateChat): Promise<IChat> {
       try {
           const chat = await Chat.create(data);
           return chat;
       } catch (error) {
           throw new Error('Error creating chat history');
       }
   }

   static async addMessage(chatId: string, message: MessageDto): Promise<IChat> {
       try {
           const chat = await Chat.findByIdAndUpdate(
               chatId,
               { 
                   $push: { 
                       messages: {
                           content: message.content,
                           timestamp: message.timestamp || new Date()
                       }
                   }
               },
               { new: true }
           ).populate('userId');

           if (!chat) {
               throw new Error('Chat not found');
           }

           return chat;
       } catch (error) {
           throw new Error('Error adding message');
       }
   }

   static async getChat(userId: string, page: number = 1, limit: number = 50): Promise<{
       chat: IChat | null;
       totalMessages: number;
       currentPage: number;
       totalPages: number;
   }> {
       try {
           const chat = await Chat.findOne({ userId }).populate('userId');
           
           if (!chat) {
               return {
                   chat: null,
                   totalMessages: 0,
                   currentPage: page,
                   totalPages: 0
               };
           }

           const totalMessages = chat.messages.length;
           const totalPages = Math.ceil(totalMessages / limit);
           const startIndex = (page - 1) * limit;

           // Sort messages by timestamp (newest first) and apply pagination
           chat.messages = chat.messages
               .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
               .slice(startIndex, startIndex + limit);

           return {
               chat,
               totalMessages,
               currentPage: page,
               totalPages
           };
       } catch (error) {
           throw new Error('Error fetching chat history');
       }
   }

   static async deleteChat(userId: string): Promise<void> {
       try {
           const result = await Chat.findOneAndDelete({ userId });
           if (!result) {
               throw new Error('Chat not found');
           }
       } catch (error) {
           throw new Error('Error deleting chat');
       }
   }
}