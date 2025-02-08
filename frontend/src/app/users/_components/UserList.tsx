"use client";

import { useState, useEffect } from 'react';
import { User, UserService } from '@/services/user.service';

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await UserService.getUsers();
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
                <div key={user.userId} className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">User ID: {user.userId}</h2>
                    <div className="space-y-2">
                        <p>Accounts: {user.accounts.length}</p>
                        
                        <p>Chat History: {user.chatHistory}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}