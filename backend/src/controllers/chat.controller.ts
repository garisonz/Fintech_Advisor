import { Request, Response, NextFunction } from 'express';
import { ChatService } from '../services/chat.services';
import { CreateChat, MessageDto } from '../types/chat.types';

export class ChatController {
    static async createChat(req: Request, res: Response, next: NextFunction) {
        try {
            const chatData: CreateChat = {
                userId: req.body.userId,
                messages: req.body.messages || []
            };
            
            const chat = await ChatService.createChat(chatData);
            
            res.status(201).json({
                status: 'success',
                data: chat
            });
        } catch (error) {
            next(error);
        }
    }

    static async addMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const { chatId } = req.params;
            const messageData: MessageDto = {
                content: req.body.content,
                timestamp: req.body.timestamp || new Date()
            };
            
            const chat = await ChatService.addMessage(chatId, messageData);
            
            res.status(200).json({
                status: 'success',
                data: chat
            });
        } catch (error) {
            next(error);
        }
    }

    static async getChat(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 50;
            
            const chatData = await ChatService.getChat(userId, page, limit);
            
            res.status(200).json({
                status: 'success',
                data: chatData
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteChat(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            await ChatService.deleteChat(userId);
            
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}