import { Wallet, Wallets } from "@/interfaces/walletInterface";
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

const walletService = {
  async getAll(): Promise<Wallets> {
    return fetchWithAuth(`${API_URL}/wallets`);
  },

  async getWalletById(id: string): Promise<Wallet> {
    return fetchWithAuth(`${API_URL}/wallets/${id}`);
  },

  async getTotals() {
    return fetchWithAuth(`${API_URL}/wallets/totals`);
  },
};

export default walletService;
