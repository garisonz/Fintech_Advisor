import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

// Define account types
export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';

// Main Account interface extending Document
export interface IAccount extends Document {
   userId: ObjectId;
   accountNumber: string;
   accountType: AccountType;
   balance: number;
}

// DTO for creating a new account
export interface CreateAccountDto {
   userId: string;           // String for API requests
   accountNumber: string;
   accountType: AccountType;
   balance: number;
}

// DTO for updating an account (all fields optional)
export interface UpdateAccountDto extends Partial<CreateAccountDto> {}