// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Bank Account endpoints
export const fetchAccounts = async () => {
  const response = await api.get('/accounts/');
  return response.data;
};

export const getAccountById = async (id: number) => {
  const response = await api.get(`/accounts/${id}/`);
  return response.data;
};

export const createAccount = async (accountData: {
  account_number: string;
  balance: number;
}) => {
  const response = await api.post('/accounts/', accountData);
  return response.data;
};

// Transaction endpoints
export const fetchTransactions = async () => {
  const response = await api.get('/transactions/');
  return response.data;
};

export const createTransaction = async (transactionData: {
  account: number;
  transaction_type: 'deposit' | 'withdrawal';
  amount: number;
}) => {
  const response = await api.post('/transactions/', transactionData);
  return response.data;
};

export const getTransactionsByAccount = async (accountId: number) => {
  const response = await api.get(`/transactions/?account=${accountId}`);
  return response.data;
};

export const createChatSession = async () => {
    const response = await api.post('/chat-sessions/', {
      user: null  // Since we're not using authentication
    });
    return response.data;
  };

export const fetchChatSessions = async () => {
  const response = await api.get('/chat-sessions/');
  return response.data;
};

export const getChatSessionById = async (sessionId: string) => {
  const response = await api.get(`/chat-sessions/${sessionId}/`);
  return response.data;
};

// Chat Message endpoints
export const sendMessage = async (sessionId: number, message: string) => {
  const response = await api.post(`/chat-sessions/${sessionId}/send_message/`, {
    message,
  });
  return response.data;
};

export const fetchMessagesForSession = async (sessionId: number) => {
  const response = await api.get(`/messages/?session=${sessionId}`);
  return response.data;
};

// Types for TypeScript
export interface BankAccount {
  id: number;
  account_number: string;
  balance: number;
}

export interface Transaction {
  id: number;
  account: number;
  transaction_type: 'deposit' | 'withdrawal';
  amount: number;
  timestamp: string;
}

export interface ChatMessage {
  id: number;
  session: number;
  message: string;
  is_bot: boolean;
  timestamp: string;
}

export interface ChatSession {
  id: number;
  session_id: string;
  started_at: string;
  messages: ChatMessage[];
}

// Error handling wrapper (optional but recommended)
export const apiWrapper = async <T>(
  apiCall: () => Promise<T>
): Promise<{ data?: T; error?: string }> => {
  try {
    const data = await apiCall();
    return { data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { 
        error: error.response?.data?.message || 'An error occurred' 
      };
    }
    return { error: 'An unexpected error occurred' };
  }
};

// Usage example with error handling:
export const fetchAccountsSafely = async () => {
  return apiWrapper(fetchAccounts);
};

export default api;