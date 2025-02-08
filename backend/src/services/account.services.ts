import Account from '../models/account.model';
import { IAccount, CreateAccountDto, UpdateAccountDto } from '../types/account.types';

export class AccountService {
    static async createAccount(data: CreateAccountDto): Promise<IAccount> {
        try {
            const account = await Account.create(data);
            return account;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Error creating account');
        }
    }

    static async getAccounts(userId?: string): Promise<IAccount[]> {
        try {
            const query = userId ? { userId } : {};
            const accounts = await Account.find(query).populate('userId');
            return accounts;
        } catch (error) {
            throw new Error('Error fetching accounts');
        }
    }

    static async getAccountById(id: string): Promise<IAccount> {
        try {
            const account = await Account.findById(id).populate('userId');
            if (!account) {
                throw new Error('Account not found');
            }
            return account;
        } catch (error) {
            throw new Error('Error fetching account');
        }
    }

    static async updateAccount(id: string, data: UpdateAccountDto): Promise<IAccount> {
        try {
            const account = await Account.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true, runValidators: true }
            );
            if (!account) {
                throw new Error('Account not found');
            }
            return account;
        } catch (error) {
            throw new Error('Error updating account');
        }
    }

    static async deleteAccount(id: string): Promise<void> {
        try {
            const account = await Account.findByIdAndDelete(id);
            if (!account) {
                throw new Error('Account not found');
            }
        } catch (error) {
            throw new Error('Error deleting account');
        }
    }
}