import Transaction from '../models/transaction.model';
import Account from '../models/account.model';
import { ITransaction, CreateTransactionDto, UpdateTransactionDto } from '../types/transaction.types';

export class TransactionService {
   static async createTransaction(data: CreateTransactionDto): Promise<ITransaction> {
       try {
           // Get current account balance before transaction
           const account = await Account.findById(data.accountId);
           if (!account) {
               throw new Error('Account not found');
           }

           // Calculate new balance based on transaction type
           let newBalance = account.balance;
           switch (data.type) {
               case 'deposit':
                   newBalance += data.amount;
                   break;
               case 'withdrawal':
               case 'bill_payment':
                   if (account.balance < data.amount) {
                       throw new Error('Insufficient funds');
                   }
                   newBalance -= data.amount;
                   break;
               case 'transfer':
                   if (account.balance < data.amount) {
                       throw new Error('Insufficient funds');
                   }
                   newBalance -= data.amount;
                   break;
           }

           // Create transaction with balance tracking
           const transaction = await Transaction.create({
               ...data,
               accountBalance: {
                   before: account.balance,
                   after: newBalance
               }
           });

           // Update account balance
           await Account.findByIdAndUpdate(data.accountId, { balance: newBalance });

           return transaction;
       } catch (error) {
           throw new Error(error instanceof Error ? error.message : 'Error creating transaction');
       }
   }

   static async getTransactions(filters: {
       userId?: string;
       accountId?: string;
       type?: string;
       startDate?: Date;
       endDate?: Date;
   }): Promise<ITransaction[]> {
       try {
           let query: any = {};

           if (filters.userId) query.userId = filters.userId;
           if (filters.accountId) query.accountId = filters.accountId;
           if (filters.type) query.type = filters.type;
           if (filters.startDate || filters.endDate) {
               query.date = {};
               if (filters.startDate) query.date.$gte = filters.startDate;
               if (filters.endDate) query.date.$lte = filters.endDate;
           }

           const transactions = await Transaction.find(query)
               .populate('userId')
               .populate('accountId')
               .sort({ date: -1 });

           return transactions;
       } catch (error) {
           throw new Error('Error fetching transactions');
       }
   }

   static async getTransactionById(id: string): Promise<ITransaction> {
       try {
           const transaction = await Transaction.findById(id)
               .populate('userId')
               .populate('accountId');

           if (!transaction) {
               throw new Error('Transaction not found');
           }

           return transaction;
       } catch (error) {
           throw new Error('Error fetching transaction');
       }
   }
}