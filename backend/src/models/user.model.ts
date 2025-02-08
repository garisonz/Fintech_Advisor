import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user.types';

const UserSchema = new Schema<IUser>({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }],
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    chatHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model<IUser>('User', UserSchema);