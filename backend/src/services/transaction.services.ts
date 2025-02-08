// services/transaction.services.ts
import mongoose from 'mongoose';
import { TransactionType } from '../types/transaction.types';
import { CreateTransactionDto, TransactionResponse } from '../types/transaction.types';
import Transaction from '../models/transaction.model';
import Account from '../models/account.model';
import User from '../models/user.model';

export class TransactionService {
  static async createTransaction(data: CreateTransactionDto): Promise<TransactionResponse> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Validate user and account
      const user = await User.findById(data.userId).session(session);
      const account = await Account.findById(data.accountId).session(session);

      if (!user || !account) {
        throw new Error('User or account not found');
      }

      // Determine balance changes based on transaction type
      const balanceBefore = account.balance;
      let balanceAfter = balanceBefore;

      switch (data.type) {
        case 'deposit':
          balanceAfter += data.amount;
          break;
        case 'withdrawal':
        case 'bill_payment':
          if (balanceBefore < data.amount) {
            throw new Error('Insufficient funds');
          }
          balanceAfter -= data.amount;
          break;
        case 'transfer':
          // For transfers, metadata should include 'toAccountId'
          if (balanceBefore < data.amount) {
            throw new Error('Insufficient funds');
          }
          balanceAfter -= data.amount;
          // Optional: Handle receiving account here
          break;
        default:
          throw new Error('Invalid transaction type');
      }

      // Update account balance
      await Account.findByIdAndUpdate(
        data.accountId,
        { balance: balanceAfter },
        { session, new: true }
      );

      // Create transaction record
      const transaction = await Transaction.create([{
        userId: data.userId,
        accountId: data.accountId,
        type: data.type,
        amount: data.amount,
        balanceBefore,
        balanceAfter,
        status: 'completed',
        metadata: data.metadata
      }], { session });

      await session.commitTransaction();

      return {
        success: true,
        data: transaction[0]
      };
    } catch (error) {
      await session.abortTransaction();
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Transaction failed'
      };
    } finally {
      session.endSession();
    }
  }
}