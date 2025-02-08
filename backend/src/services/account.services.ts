import mongoose from 'mongoose';
import Account from '../models/account.model';
import User from '../models/user.model';
import { IAccount, CreateAccountDto, UpdateAccountDto } from '../types/account.types';

export class AccountService {
  static async createAccount(data: CreateAccountDto): Promise<IAccount> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Verify user exists
      const user = await User.findById(data.userId).session(session);
      if (!user) {
        throw new Error('User not found');
      }

      // Create account with session
      const [account] = await Account.create([data], { session });

      // Update user's accounts array
      await User.findByIdAndUpdate(
        data.userId,
        { $push: { accounts: account._id } },
        { session, new: true, runValidators: true }
      );

      await session.commitTransaction();
      
      // Populate user details before returning
      return await account.populate('userId');
    } catch (error) {
      await session.abortTransaction();
      throw new Error(
        error instanceof Error ? error.message : 'Error creating account'
      );
    } finally {
      session.endSession();
    }
  }

  static async getAccounts(userId?: string): Promise<IAccount[]> {
    try {
      const query = userId ? { userId } : {};
      return await Account.find(query)
        .populate('userId')
        .populate({
          path: 'transactions',
          options: { sort: { createdAt: -1 }, limit: 10 } // Get latest 10 transactions
        });
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error fetching accounts'
      );
    }
  }

  static async getAccountById(id: string): Promise<IAccount> {
    try {
      const account = await Account.findById(id)
        .populate('userId')
        .populate({
          path: 'transactions',
          options: { sort: { createdAt: -1 } }
        });

      if (!account) {
        throw new Error('Account not found');
      }

      return account;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error fetching account'
      );
    }
  }

  static async updateAccount(id: string, data: UpdateAccountDto): Promise<IAccount> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const account = await Account.findByIdAndUpdate(
        id,
        { $set: data },
        { 
          session,
          new: true, 
          runValidators: true,
          populate: ['userId', 'transactions']
        }
      );

      if (!account) {
        throw new Error('Account not found');
      }

      await session.commitTransaction();
      return account;
    } catch (error) {
      await session.abortTransaction();
      throw new Error(
        error instanceof Error ? error.message : 'Error updating account'
      );
    } finally {
      session.endSession();
    }
  }

  static async deleteAccount(id: string): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const account = await Account.findById(id).session(session);
      if (!account) {
        throw new Error('Account not found');
      }

      // Ensure account has no balance
      if (account.balance > 0) {
        throw new Error('Cannot delete account with remaining balance');
      }

      // Remove account reference from user
      await User.findByIdAndUpdate(
        account.userId,
        { $pull: { accounts: account._id } },
        { session }
      );

      // Delete the account
      await Account.findByIdAndDelete(id).session(session);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new Error(
        error instanceof Error ? error.message : 'Error deleting account'
      );
    } finally {
      session.endSession();
    }
  }

  static async getAccountTransactions(id: string, limit = 10, skip = 0): Promise<IAccount> {
    try {
      const account = await Account.findById(id)
        .populate({
          path: 'transactions',
          options: {
            sort: { createdAt: -1 },
            limit,
            skip
          }
        });

      if (!account) {
        throw new Error('Account not found');
      }

      return account;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error fetching account transactions'
      );
    }
  }
}
