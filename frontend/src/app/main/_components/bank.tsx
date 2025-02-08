"use client";
import { fetchAccounts, type BankAccount } from '@/services/api';

import { useState, useEffect } from 'react';

const BankAccountDisplay = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAccounts();
        setAccounts(data);
        setError(null);
      } catch (error) {
        console.error('Error loading accounts:', error);
        setError('Failed to load accounts');
      } finally {
        setIsLoading(false);
      }
    };

    loadAccounts();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="w-1/3">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="w-1/4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
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
      <h2 className="text-2xl font-bold mb-4">Bank Accounts</h2>
      {accounts.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No accounts found</p>
      ) : (
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Account Number</p>
                  <p className="font-semibold">{account.account_number}</p>
                </div>
                <div>
                  <p className="text-gray-600">Balance</p>
                  <p className="font-semibold text-green-600">
                    ${parseFloat(account.balance.toString()).toFixed(2)}
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

export default BankAccountDisplay;