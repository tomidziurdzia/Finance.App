import Cookies from "js-cookie";
import {
  Transaction,
  TransactionRequest,
} from "@/interfaces/transactionInterface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Usamos js-cookie para obtener el token
  const token = Cookies.get("auth_token");

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
    return fetchWithAuth(`${API_URL}/transactions`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export default transactionService;
