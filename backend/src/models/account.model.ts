// src/models/account.model.ts
import mongoose, { Schema } from 'mongoose';
import { IAccount, AccountType } from '../types/account.types';

const AccountSchema = new Schema<IAccount>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    accountNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    accountType: { 
        type: String, 
        enum: ['checking', 'savings', 'credit', 'investment'] as AccountType[],
        required: true 
    },
    balance: { 
        type: Number, 
        required: true 
    }
}, {
    timestamps: true
});

export default mongoose.model<IAccount>("Account", AccountSchema);
