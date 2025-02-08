import mongoose, { Schema, Document } from 'mongoose';
import { TransactionType } from '../types/transaction.types';

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    accountId: mongoose.Types.ObjectId;
    type: TransactionType;
    amount: number;
    balanceAfter: number;
    balanceBefore: number;
    status: 'pending' | 'completed' | 'failed';
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'transfer', 'bill_payment'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    balanceAfter: {
        type: Number,
        required: true
    },
    balanceBefore: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    metadata: {
        type: Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});

// Indexes for common queries
TransactionSchema.index({ createdAt: -1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ type: 1 });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);