import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({

});

export const UserModel = mongoose.model('User', UserSchema);