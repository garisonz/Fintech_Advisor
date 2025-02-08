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
import { fetchAccounts, type BankAccount } from '@/services/api';
import { useState, useEffect } from 'react';

export function AccountTable() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Correct usage of Next.js router

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

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, account) =>
    sum + parseFloat(account.balance.toString()), 0
  );

  // Handle row click to navigate to user account page
  const handleRowClick = (accountId: string) => {
    router.push(`/account/${accountId}`); // Navigate to the account's page
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Acc Id</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow 
            key={account.id} 
            className="cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleRowClick(account.account_number)}
          >
            <TableCell className="font-medium">{account.id}</TableCell>
            <TableCell>{account.account_number}</TableCell>
            <TableCell>
              <span className={account.balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                ${Math.abs(parseFloat(account.balance.toString())).toFixed(2)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total Accounts</TableCell>
          <TableCell colSpan={2} className="text-right">{accounts.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
