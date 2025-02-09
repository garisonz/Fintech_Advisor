"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTransactions } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CircleDollarSign,
  ShoppingBag,
  CreditCard,
  Building,
  Utensils,
  Car,
  Home,
  Plane
} from "lucide-react";

interface Transaction {
  id: number;
  account: number;
  transaction_type: "deposit" | "withdrawal";
  amount: number;
  description: string;
  date: string;
  account_details?: {
    account_number: string;
  };
}

const TransactionSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} className="h-[80px] w-full rounded-lg" />
    ))}
  </div>
);

const TransactionsPage = () => {
  const params = useParams();
  const userId = params?.userId as string | undefined;
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchTransactions(userId);
    }
  }, [userId]);

  const fetchTransactions = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getTransactions(Number(id));
      
      if (response.error) {
        setError(response.error);
        setTransactions([]);
        return;
      }

      if (!response.data || !Array.isArray(response.data)) {
        setTransactions([]);
        return;
      }

      // Sort transactions by date (most recent first)
      const sortedTransactions = [...response.data].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setTransactions(sortedTransactions);
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
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (description: string | undefined | null) => {
    const desc = description?.toLowerCase() ?? '';
    if (desc.includes('restaurant') || desc.includes('food')) return <Utensils className="h-5 w-5" />;
    if (desc.includes('transport') || desc.includes('uber')) return <Car className="h-5 w-5" />;
    if (desc.includes('shopping')) return <ShoppingBag className="h-5 w-5" />;
    if (desc.includes('rent') || desc.includes('mortgage')) return <Home className="h-5 w-5" />;
    if (desc.includes('travel') || desc.includes('flight')) return <Plane className="h-5 w-5" />;
    if (desc.includes('transfer')) return <CreditCard className="h-5 w-5" />;
    if (desc.includes('bank')) return <Building className="h-5 w-5" />;
    return <CircleDollarSign className="h-5 w-5" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Recent Transactions
          </CardTitle>
          {!isLoading && transactions.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Showing {transactions.length} transactions
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isLoading && <TransactionSkeleton />}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && transactions.length === 0 && (
            <Alert>
              <AlertDescription>
                No transactions found. Make a deposit or withdrawal to get started.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && transactions.length > 0 && (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={transaction.transaction_type === 'deposit' ? 'text-green-500' : 'text-red-500'}>
                        {transaction.transaction_type === 'deposit' ? (
                          <ArrowDownCircle className="h-8 w-8" />
                        ) : (
                          <ArrowUpCircle className="h-8 w-8" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(transaction.description)}
                          <p className="font-medium">{transaction.description || 
                            `${transaction.transaction_type.charAt(0).toUpperCase()}${transaction.transaction_type.slice(1)}`}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-lg ${
                        transaction.transaction_type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.transaction_type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      {transaction.account_details && (
                        <p className="text-sm text-muted-foreground">
                          Account ending in {transaction.account_details.account_number.slice(-4)}
                        </p>
                      )}
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

export default TransactionsPage;