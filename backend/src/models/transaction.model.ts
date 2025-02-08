// src/models/transaction.model.ts
import mongoose, { Schema } from 'mongoose';
import { ITransaction, TransactionType } from '../types/transaction.types';

const TransactionSchema = new Schema<ITransaction>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    accountId: { 
        type: Schema.Types.ObjectId, 
        ref: "Account", 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['deposit', 'withdrawal', 'transfer', 'bill_payment'] as TransactionType[], 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    accountBalance: {
        before: {
            type: Number,
            required: true
        },
        after: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
