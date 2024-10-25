import api from "./api";
import { Transaction } from "@/interfaces/transactionInterface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const transactionService = {
  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    console.log(data);
    const response = await api.post(`${API_URL}/transactions`, data);
    return response.data;
  },
};

export default transactionService;
