import {
  Transaction,
  TransactionRequest,
} from "@/interfaces/transactionInterface";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token: string | null = null;

  const cookieStore = cookies();
  token = cookieStore.get("auth_token")?.value || null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    throw new Error("Unauthorized access");
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

const transactionService = {
  async createTransaction(data: TransactionRequest): Promise<Transaction> {
    const result = await fetchWithAuth(`${API_URL}/transactions`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return result;
  },

  async getTransactions(): Promise<Transaction[]> {
    return fetchWithAuth(`${API_URL}/transactions`);
  },

  async getTransactionById(id: string): Promise<Transaction> {
    return fetchWithAuth(`${API_URL}/transactions/${id}`);
  },

  async updateTransaction(
    id: string,
    data: Partial<TransactionRequest>
  ): Promise<Transaction> {
    const result = await fetchWithAuth(`${API_URL}/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return result;
  },

  async deleteTransaction(id: string): Promise<void> {
    await fetchWithAuth(`${API_URL}/transactions/${id}`, {
      method: "DELETE",
    });
  },
};

export default transactionService;