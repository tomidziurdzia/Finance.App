"use server";

import { cookies } from "next/headers";
import {
  Transaction,
  TransactionRequest,
} from "@/interfaces/transactionInterface";
import { apiUrls } from "@/lib/apiUrls";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized access");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
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

export async function createTransaction(
  data: TransactionRequest
): Promise<Transaction> {
  return fetchWithAuth(`${API_URL}/${apiUrls.transactions}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getTransactions(): Promise<Transaction[]> {
  return fetchWithAuth(`${API_URL}/transactions`);
}

export async function getTransactionById(id: string): Promise<Transaction> {
  return fetchWithAuth(`${API_URL}/transactions/${id}`);
}

export async function updateTransaction(
  id: string,
  data: Partial<TransactionRequest>
): Promise<Transaction> {
  return fetchWithAuth(`${API_URL}/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteTransaction(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });
}
