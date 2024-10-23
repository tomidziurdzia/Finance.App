import { Wallets } from "@/interfaces/walletInterface";
import api from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const walletService = {
  async getAll(): Promise<Wallets> {
    const response = await api.get(`${API_URL}/wallets`);

    return response.data;
  },
};

export default walletService;
