import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { user_id, account_type } = req.body; // Extract user input

        const response = await fetch('http://127.0.0.1:8000/api/create-bank-account/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id || null, // Use provided ID or None
                account_type: account_type || 'checking', // Default to 'checking'
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create bank account');
        }

        return res.status(200).json({ message: 'Bank account created successfully', account: data });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
