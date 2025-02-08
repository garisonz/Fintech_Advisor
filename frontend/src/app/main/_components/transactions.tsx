"use client";
import { fetchTransactions, type Transaction } from '@/services/api';
import { useState, useEffect } from 'react';

const TransactionDisplay = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdrawal'>('all');

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTransactions();
        setTransactions(data);
        setError(null);
      } catch (error) {
        console.error('Error loading transactions:', error);
        setError('Failed to load transactions');
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.transaction_type === filter;
  });

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('deposit')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'deposit'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Deposits
          </button>
          <button
            onClick={() => setFilter('withdrawal')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'withdrawal'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Withdrawals
          </button>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No transactions found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.transaction_type === 'deposit'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.transaction_type.charAt(0).toUpperCase() + 
                       transaction.transaction_type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        transaction.transaction_type === 'deposit'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      ${parseFloat(transaction.amount.toString()).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {transaction.account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionDisplay;