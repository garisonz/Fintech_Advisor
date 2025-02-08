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
    chatHistory: [{
        type: Schema.Types.Mixed
    }]
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);