import mongoose, { Schema } from 'mongoose';
import { IAccount, AccountType } from '../types/account.types';

const AccountSchema = new Schema<IAccount>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
        index: true
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
        required: true,
        default: 0
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
}, {
    timestamps: true
});

export default mongoose.model<IAccount>('Account', AccountSchema);