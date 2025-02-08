import { errorHandler } from '../middleware/error.middleware';
import User from '../models/user.model';
import { CreateUserDto, UpdateUserDto, IUser } from '../types/user.types';

export class UserService {
    static async createUser(data: CreateUserDto): Promise<IUser> {
        try {
            const user = await User.create(data);
            return user;
        } catch (errorHandler) {
            throw new Error('Error creating user');
        }
    }

    static async getUsers(): Promise<IUser[]> {
        const users = await User.find()
            .populate('accounts')
            .populate('transactions')
            .populate('chatHistory');
        return users;
    }

    static async getUserById(id: string): Promise<IUser> {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }

    static async updateUser(id: string, data: UpdateUserDto): Promise<IUser | null> {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        );

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    static async deleteUser(id: string): Promise<void> {
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            throw new Error('User not found');
        }
    }
}
