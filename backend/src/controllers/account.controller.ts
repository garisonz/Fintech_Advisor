import { Request, Response, NextFunction } from 'express';
import { AccountService } from '../services/account.services';
import { CreateAccountDto, UpdateAccountDto } from '../types/account.types';

export class AccountController {
    static async createAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const accountData: CreateAccountDto = req.body;
            const account = await AccountService.createAccount(accountData);
            res.status(201).json({
                status: 'success',
                data: account,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAccounts(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.query;
            const accounts = await AccountService.getAccounts(userId as string);
            res.status(200).json({
                status: 'success',
                data: accounts,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAccountById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const account = await AccountService.getAccountById(id);
            res.status(200).json({
                status: 'success',
                data: account,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const updateData: UpdateAccountDto = req.body;
            const account = await AccountService.updateAccount(id, updateData);
            res.status(200).json({
                status: 'success',
                data: account,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await AccountService.deleteAccount(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async getAccountTransactions(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { limit = 10, skip = 0 } = req.query;
            const account = await AccountService.getAccountTransactions(
                id,
                Number(limit),
                Number(skip)
            );
            res.status(200).json({
                status: 'success',
                data: account,
            });
        } catch (error) {
            next(error);
        }
    }
}