"use server";

import {
  Transaction,
  TransactionRequest,
} from "@/interfaces/transactionInterface";
import fetchWithAuth from "@/lib/fetchWithAuth";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createTransaction(
  data: TransactionRequest
): Promise<Transaction> {
  const transaction = await fetchWithAuth(`${API_URL}/transactions`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/transactions");
  return transaction;
}

export async function getTransactions(): Promise<Transaction[]> {
  const transactions = await fetchWithAuth(`${API_URL}/transactions`);
  return transactions;
}

export async function getTransactionById(id: string): Promise<Transaction> {
  const transaction = await fetchWithAuth(`${API_URL}/transactions/${id}`);
  return transaction;
}

export async function updateTransaction(
  id: string,
  data: Partial<TransactionRequest>
): Promise<Transaction> {
  const updatedTransaction = await fetchWithAuth(
    `${API_URL}/transactions/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

  revalidatePath("/transactions");
  return updatedTransaction;
}

export async function deleteTransaction(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });

  revalidatePath("/transactions");
}
