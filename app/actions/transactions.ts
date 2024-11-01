"use server";

import {
  Transaction,
  TransactionRequest,
} from "@/interfaces/transactionInterface";
import { apiUrls } from "@/lib/apiUrls";
import fetchWithAuth from "@/lib/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const CACHE_EXPIRATION = 5 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheItem<any>>();

function getCachedData<T>(key: string): T | null {
  const cachedItem = cache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_EXPIRATION) {
    return cachedItem.data;
  } else if (cachedItem) {
    cache.delete(key);
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export async function createTransaction(
  data: TransactionRequest
): Promise<Transaction> {
  invalidateTransactionCache();
  return fetchWithAuth(`${API_URL}/${apiUrls.transactions}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getTransactions(): Promise<Transaction[]> {
  const cacheKey = "allTransactions";
  const cachedTransactions = getCachedData<Transaction[]>(cacheKey);

  if (cachedTransactions) {
    return cachedTransactions;
  }

  const transactions = await fetchWithAuth(`${API_URL}/transactions`);
  setCachedData(cacheKey, transactions);
  return transactions;
}

export async function getTransactionById(id: string): Promise<Transaction> {
  const cacheKey = `transaction_${id}`;
  const cachedTransaction = getCachedData<Transaction>(cacheKey);

  if (cachedTransaction) {
    return cachedTransaction;
  }

  const transaction = await fetchWithAuth(`${API_URL}/transactions/${id}`);
  setCachedData(cacheKey, transaction);
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
  setCachedData(`transaction_${id}`, updatedTransaction);
  invalidateTransactionCache();
  return updatedTransaction;
}

export async function deleteTransaction(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });
  cache.delete(`transaction_${id}`);
  invalidateTransactionCache();
}

function invalidateTransactionCache() {
  for (const key of [...cache.keys()]) {
    if (key.startsWith("transaction_") || key === "allTransactions") {
      cache.delete(key);
    }
  }
}
