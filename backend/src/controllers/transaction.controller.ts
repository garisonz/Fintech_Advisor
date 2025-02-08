import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.services';
import { CreateTransactionDto } from '../types/transaction.types';

export class TransactionController {
    static async createTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const transactionData: CreateTransactionDto = req.body;
            const transaction = await TransactionService.createTransaction(transactionData);
            
            res.status(201).json({
                status: 'success',
                data: transaction
            });
        } catch (error) {
            next(error);
        }
    }

    static async getTransactions(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, accountId, type, startDate, endDate } = req.query;
            
            const filters = {
                userId: userId as string,
                accountId: accountId as string,
                type: type as string,
                startDate: startDate ? new Date(startDate as string) : undefined,
                endDate: endDate ? new Date(endDate as string) : undefined
            };

            const transactions = await TransactionService.getTransactions(filters);
            
            res.status(200).json({
                status: 'success',
                data: transactions
            });
        } catch (error) {
            next(error);
        }
    }

    static async getTransactionById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const transaction = await TransactionService.getTransactionById(id);
            
            res.status(200).json({
                status: 'success',
                data: transaction
            });
        } catch (error) {
            next(error);
        }
    }
}