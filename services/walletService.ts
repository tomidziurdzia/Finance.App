import { Wallet, Wallets } from "@/interfaces/walletInterface";
import api from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const walletService = {
  async getAll(): Promise<Wallets> {
    const response = await api.get(`${API_URL}/wallets`);

    return response.data;
  },

  async getWalletById(id: string): Promise<Wallet> {
    const response = await api.get(`${API_URL}/wallets/${id}`);

    return response.data;
  },

  async getTotals() {
    const response = await api.get(`${API_URL}/wallets/totals`);
    return response.data;
  },
};

export default walletService;
