// controllers/transaction.controller.ts
import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.services';

export class TransactionController {
    public async createTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const result = await TransactionService.createTransaction(req.body);

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
}