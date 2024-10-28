import { revalidatePath } from "next/cache";
import api from "./api";
import {
  Transaction,
  TransactionRequest,
} from "@/interfaces/transactionInterface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const transactionService = {
  async createTransaction(data: TransactionRequest): Promise<Transaction> {
    const response = await api.post(`${API_URL}/transactions`, data);
    revalidatePath("/wallets");
    return response.data;
  },
};

export default transactionService;
