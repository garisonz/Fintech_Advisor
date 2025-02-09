"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBankAccountsByUserId } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeDollarSign, CreditCard, Building } from "lucide-react";

interface BankAccount {
  id: number;
  account_number: string;
  balance: number;
  account_type: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

interface ApiResponse {
  data: BankAccount[] | null;
  error: string | null;
}

const AccountSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-[100px] w-full rounded-lg" />
    <Skeleton className="h-[100px] w-full rounded-lg" />
    <Skeleton className="h-[100px] w-full rounded-lg" />
  </div>
);

const BankAccountPage = () => {
  const params = useParams();
  const userId = params?.userId as string | undefined;
  
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchBankAccounts(userId);
    }
  }, [userId]);

  const fetchBankAccounts = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse = await getBankAccountsByUserId(Number(id));

      if (response.error) {
        setError(response.error);
        setAccounts([]);
        return;
      }

      if (!response.data || response.data.length === 0) {
        setAccounts([]);
        return;
      }

      setAccounts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getAccountTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'checking':
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case 'savings':
        return <BadgeDollarSign className="h-5 w-5 text-green-500" />;
      default:
        return <Building className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Building className="h-6 w-6" />
            Bank Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <AccountSkeleton />}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && accounts.length === 0 && (
            <Alert>
              <AlertDescription>
                No bank accounts found for this user. Please add an account to get started.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && accounts.length > 0 && (
            <div className="space-y-4">
              {accounts.map((account) => (
                <Card key={account.id}>
                  <CardContent className="p-6 hover:bg-accent/50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        {getAccountTypeIcon(account.account_type)}
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Account Number
                          </p>
                          <p className="font-semibold">
                            •••• {account.account_number.slice(-4)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-500">
                          Balance
                        </p>
                        <p className="font-semibold text-lg">
                          {formatCurrency(account.balance)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-500">
                          Type
                        </p>
                        <p className="font-semibold capitalize">
                          {account.account_type}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BankAccountPage;