import { Document } from 'mongoose';

export interface IUser extends Document {
    userId: string;
    accounts: string[];
    transactions: string[];
    chatHistory: string[];
}

export interface CreateUserDto {
    userId: string;
    accounts: string[];
    transactions: string[];
    chatHistory: string[];
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}