"use server";

import { TotalWallets, Wallet, Wallets } from "@/interfaces/walletInterface";
import fetchWithAuth from "@/lib/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const CACHE_EXPIRATION = 5 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export async function getAllWallets(): Promise<Wallets> {
  const cacheKey = "allWallets";
  const cachedWallets = getCachedData<Wallets>(cacheKey);

  if (cachedWallets) {
    return cachedWallets;
  }

  try {
    const wallets = await fetchWithAuth(`${API_URL}/wallets`);
    setCachedData(cacheKey, wallets);
    return wallets;
  } catch (error) {
    console.error("Error fetching all wallets:", error);
    throw error;
  }
}

export async function getWalletById(id: string): Promise<Wallet> {
  const cacheKey = `wallet_${id}`;
  const cachedWallet = getCachedData<Wallet>(cacheKey);

  if (cachedWallet) {
    return cachedWallet;
  }

  try {
    const wallet = await fetchWithAuth(`${API_URL}/wallets/${id}`);
    setCachedData(cacheKey, wallet);
    return wallet;
  } catch (error) {
    console.error(`Error fetching wallet with id ${id}:`, error);
    throw error;
  }
}

export async function getWalletTotals(): Promise<TotalWallets> {
  const cacheKey = "walletTotals";
  const cachedTotals = getCachedData<TotalWallets>(cacheKey);

  if (cachedTotals) {
    return cachedTotals;
  }

  try {
    const totals = await fetchWithAuth(`${API_URL}/wallets/totals`);
    setCachedData(cacheKey, totals);
    return totals;
  } catch (error) {
    console.error("Error fetching wallet totals:", error);
    throw error;
  }
}

export async function invalidateWalletCache() {
  cache.delete("allWallets");
  cache.delete("walletTotals");
}

export async function invalidateWalletByIdCache(id: string) {
  cache.delete(`wallet_${id}`);
}
