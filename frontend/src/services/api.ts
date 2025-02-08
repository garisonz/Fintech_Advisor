import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Bank Account Endpoints

// Fetch all bank accounts
export const fetchAccounts = async () => {
  const response = await api.get('/accounts/');
  return response.data;
};

// Fetch a bank account by ID
export const getAccountById = async (id: number) => {
  const response = await api.get(`/accounts/${id}/`);
  return response.data;
};

// Fetch bank accounts by User ID (New)
export const getBankAccountsByUserId = async (userId: number) => {
  const response = await api.get(`/bank-accounts-by-user/?id=${userId}`);
  return response.data;
};

// Create a new bank account
export const createAccount = async (accountData: {
  account_number: string;
  balance: number;
}) => {
  const response = await api.post('/accounts/', accountData);
  return response.data;
};

// Transaction Endpoints

// Fetch all transactions
export const fetchTransactions = async () => {
  const response = await api.get('/transactions/');
  return response.data;
};

// Create a new transaction (deposit or withdrawal)
export const createTransaction = async (transactionData: {
  account: number;
  transaction_type: 'deposit' | 'withdrawal';
  amount: number;
}) => {
  const response = await api.post('/transactions/', transactionData);
  return response.data;
};

// Fetch transactions by account ID (Improved)
export const getTransactionsByAccount = async (accountId: number) => {
  const response = await api.get(`/transactions/`, {
    params: { account: accountId },
  });
  return response.data;
};

// Chat Session Endpoints

// Create a chat session (Now accepts user ID)
export const createChatSession = async (userId: number | null = null) => {
  const response = await api.post('/chat-sessions/', { user: userId });
  return response.data;
};

// Fetch all chat sessions
export const fetchChatSessions = async () => {
  const response = await api.get('/chat-sessions/');
  return response.data;
};

// Fetch chat sessions by User ID
export const getChatSessionsByUserId = async (userId: number) => {
  const response = await api.get(`/chat-sessions/`, {
    params: { user: userId },
  });
  return response.data;
};

// Fetch a specific chat session by ID
export const getChatSessionById = async (sessionId: string) => {
  const response = await api.get(`/chat-sessions/${sessionId}/`);
  return response.data;
};

// Chat Message Endpoints

// Send a message in a chat session
export const sendMessage = async (sessionId: number, message: string) => {
  const response = await api.post(`/chat-sessions/${sessionId}/send_message/`, {
    message,
  });
  return response.data;
};

// Fetch chat messages for a session
export const fetchMessagesForSession = async (sessionId: number) => {
  const response = await api.get(`/messages/`, {
    params: { session: sessionId },
  });
  return response.data;
};

// Authentication Endpoints

// User login (Returns token)
export const loginUser = async (username: string, password: string) => {
  const response = await api.post('/login/', { username, password });
  localStorage.setItem('authToken', response.data.token); // Store token for future requests
  return response.data;
};

// User logout
export const logoutUser = async () => {
  const response = await api.post('/logout/');
  localStorage.removeItem('authToken'); // Remove token on logout
  return response.data;
};

// Types for TypeScript

export interface BankAccount {
    id: number;
    account_number: string;
    balance: number;
    user_id: number;
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

// Error Handling Wrapper (Recommended)

export const apiWrapper = async <T>(
  apiCall: () => Promise<T>
): Promise<{ data?: T; error?: string }> => {
  try {
    const data = await apiCall();
    return { data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred',
      };
    }
    return { error: 'An unexpected error occurred' };
  }
};

// Safe API Calls with Error Handling

export const fetchAccountsSafely = async () => apiWrapper(fetchAccounts);
export const fetchTransactionsSafely = async () => apiWrapper(fetchTransactions);
export const fetchChatSessionsSafely = async () => apiWrapper(fetchChatSessions);

export default api;
