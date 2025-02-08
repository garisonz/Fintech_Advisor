"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAccounts, type BankAccount } from "@/services/api";
import { useState, useEffect } from "react";

export function AccountTable() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const loadAccounts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchAccounts();
        if (data.error) {
          setError(data.error);
        } else {
          setAccounts(data || []);
        }
      } catch (err) {
        console.error("Error loading accounts:", err);
        setError("Failed to load accounts.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAccounts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-600 bg-white rounded-md border">
        {error}
      </div>
    );
  }

  const handleRowClick = (userId: number) => {
    router.push(`/bank-accounts/${userId}`); 
  };

  return (
    <Table>
      <TableCaption>A list of your bank accounts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Account Number</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow
            key={account.id}
            className="cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleRowClick(account.user_id)}  
          >
            <TableCell className="font-medium">{account.id}</TableCell>
            <TableCell>{account.account_number}</TableCell>
            <TableCell>
              <span className={account.balance >= 0 ? "text-green-600" : "text-red-600"}>
                ${parseFloat(account.balance.toString()).toFixed(2)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total Accounts</TableCell>
          <TableCell className="text-right">{accounts.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
