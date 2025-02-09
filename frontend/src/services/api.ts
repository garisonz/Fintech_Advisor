import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

// Generalized function to handle API errors
const handleApiError = (error: unknown, defaultMessage: string) => {
  console.error("API Error:", error);
  return { data: null, error: defaultMessage };
};

export interface BankAccount {
  id: number;
  account_number: string;
  balance: number;
  user_id: number;
  account_type: string;
}

// Fetch all bank accounts
export const fetchAccounts = async () => {
  const response = await api.get('/accounts/');
  return response.data;
};

// Fetch bank accounts by user ID
export const getBankAccountsByUserId = async (userId: number) => {
  try {
    const { data } = await api.get(`/bank-accounts-by-user/`, {
      params: { id: userId },
    });
    return { data, error: null };
  } catch (error) {
    return handleApiError(error, "Failed to fetch bank accounts");
  }
};

// Create a new bank account
export const createBankAccount = async (userId: number | null, accountType: string) => {
    try {
      const { data } = await api.post("/accounts/", {
        user_id: userId || null,  // Assign user ID if provided, else null
        account_type: accountType || "checking", // Default account type
      });
      return { data, error: null };
    } catch (error) {
      return handleApiError(error, "Failed to create bank account");
    }
  };

// Transactions API
export const getTransactions = async (userId: number) => {
  try {
    const { data } = await api.get(`/transactions-by-user/`, {
      params: { id: userId }
    });
    return { data, error: null };
  } catch (error) {
    return handleApiError(error, "Failed to fetch transactions");
  }
};

export const createTransaction = async (
  account: number,
  transaction_type: "deposit" | "withdrawal",
  amount: number
) => {
  try {
    const { data } = await api.post("/transactions/", {
      account,
      transaction_type,
      amount,
    });
    return { data, error: null };
  } catch (error) {
    return handleApiError(error, "Failed to create transaction");
  }
};

// Chat API
export const createChatSession = async (userId: number | null = null) => {
  try {
    const { data } = await api.post("/chat-sessions/", { user: userId });
    return { data, error: null };
  } catch (error) {
    return handleApiError(error, "Failed to create chat session");
  }
};

export const getChatSessionById = async (sessionId: string) => {
  try {
    const { data } = await api.get(`/chat-sessions/${sessionId}/`);
    return { data, error: null };
  } catch (error) {
    return handleApiError(error, "Failed to fetch chat session");
  }
};

export const sendMessage = async (sessionId: number, message: string) => {
  try {
    const { data } = await api.post(`/chat-sessions/${sessionId}/send_message/`, { message });
    return { data, error: null };
  } catch (error) {
    return handleApiError(error, "Failed to send message");
  }
};

export default api;
