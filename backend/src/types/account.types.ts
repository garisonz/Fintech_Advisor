import { Document, Types } from 'mongoose';

export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';

export interface IAccount extends Document {
   userId: Types.ObjectId;
   accountNumber: string;
   accountType: AccountType;
   balance: number;
   transactions: Types.ObjectId[];
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateAccountDto {
   userId: string;
   accountNumber: string;
   accountType: AccountType;
   balance: number;
   transactions?: string[];
}

export interface UpdateAccountDto extends Partial<Omit<CreateAccountDto, 'userId'>> {}