"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTransactions } from "@/services/api";

interface Transaction {
    id: number;
    account: number;
    amount: number;
    description: string;
    date: string;
}

const TransactionsPage = () => {
    const params = useParams();
    const userId = params?.userId as string | undefined;

    console.log("Extracted userId from URL:", userId);

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            console.log("Fetching transactions for user:", userId);
            fetchTransactions(userId);
        }
    }, [userId]);

    const fetchTransactions = async (id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await getTransactions(Number(id));

            console.log("API Response:", data);

            if (error) {
                setError(error);
                setTransactions([]);
            } else if (!data || data.length === 0) {
                console.warn("No transactions found for this user.");
                setTransactions([]);
            } else {
                setTransactions(data);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>

            {isLoading && <p className="text-gray-500 text-center py-4">Loading...</p>}
            {error && <p className="text-red-500 text-center py-4">{error}</p>}

            {!isLoading && !error && transactions.length === 0 && (
                <p className="text-gray-500 text-center py-4">No transactions found</p>
            )}

            {!isLoading && transactions.length > 0 && (
                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-600">Amount</p>
                                    <p className="font-semibold text-blue-600">
                                        ${parseFloat(transaction.amount.toString()).toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Description</p>
                                    <p className="font-semibold">{transaction.description}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Date</p>
                                    <p className="font-semibold">
                                        {new Date(transaction.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
