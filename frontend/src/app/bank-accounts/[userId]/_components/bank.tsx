"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBankAccountsByUserId } from "@/services/api";

const BankAccountPage = () => {
  const params = useParams();
  const userId = params?.userId as string | undefined;

  console.log("Extracted userId from URL:", userId);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      console.log("Fetching bank accounts for user:", userId);
      fetchBankAccounts(userId);
    }
  }, [userId]);

  const fetchBankAccounts = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await getBankAccountsByUserId(Number(id));

      console.log("API Response:", data);

      if (error) {
        setError(error);
        setAccounts([]);
      } else if (!data || data.length === 0) {
        console.warn("No accounts found for this user.");
        setAccounts([]);
      } else {
        setAccounts(data);
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
      <h2 className="text-2xl font-bold mb-4">Bank Accounts</h2>

      {isLoading && <p className="text-gray-500 text-center py-4">Loading...</p>}
      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      {!isLoading && !error && accounts.length === 0 && (
        <p className="text-gray-500 text-center py-4">No accounts found</p>
      )}

      {!isLoading && accounts.length > 0 && (
        <div className="space-y-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
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

export default BankAccountPage;
