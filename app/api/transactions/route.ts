"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  TransactionRequest,
  Transaction,
} from "@/interfaces/transactionInterface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createTransaction(
  data: TransactionRequest
): Promise<Transaction> {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  const transaction: Transaction = await response.json();

  revalidatePath("/transactions");

  return transaction;
}
