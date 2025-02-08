import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

// Define the possible transaction types
export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'bill_payment';

// Account balance structure
interface AccountBalance {
    before: number;
    after: number;
}

// Main Transaction interface that extends Document
export interface ITransaction extends Document {
    userId: ObjectId;
    accountId: ObjectId;
    type: TransactionType;
    amount: number;
    date: Date;
    accountBalance: AccountBalance;
}

// DTO for creating a new transaction
export interface CreateTransactionDto {
    userId: string;          // Using string for API requests
    accountId: string;       // Using string for API requests
    type: TransactionType;
    amount: number;
    date?: Date;            // Optional since it has a default value
    accountBalance: {
        before: number;
        after: number;
    };
}

// DTO for updating a transaction (all fields optional)
export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}