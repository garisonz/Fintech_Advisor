import { api } from '../lib/axios';

export interface User {
    userId: string;
    accounts: string[];
    chatHistory: string[];
}

export interface CreateUserDto {
    userId: string;
    accounts: string[];
    chatHistory: string[];
}

export const UserService = {
    // Get all users
    getUsers: async () => {
        const response = await api.get<{ status: string; data: User[] }>('/users');
        return response.data;
    },

    // Get user by ID
    getUserById: async (id: string) => {
        const response = await api.get<{ status: string; data: User }>(`/users/${id}`);
        return response.data;
    },

    // Create new user
    createUser: async (userData: CreateUserDto) => {
        const response = await api.post<{ status: string; data: User }>('/users', userData);
        return response.data;
    },

    // Update user
    updateUser: async (id: string, userData: Partial<CreateUserDto>) => {
        const response = await api.patch<{ status: string; data: User }>(`/users/${id}`, userData);
        return response.data;
    },

    // Delete user
    deleteUser: async (id: string) => {
        await api.delete(`/users/${id}`);
    },
};