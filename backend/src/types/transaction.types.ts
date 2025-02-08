export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'bill_payment';

export interface CreateTransactionDto {
    userId: string;
    accountId: string;
    type: TransactionType;
    amount: number;
    metadata?: Record<string, any>;
}

export interface TransactionResponse {
    success: boolean;
    data?: any;
    error?: string;
}