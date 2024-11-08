"use server";

import { Wallet, Wallets } from "interfaces/walletInterface";
import { apiUrls } from "lib/apiUrls";
import fetchWithAuth from "lib/fetchWithAuth";

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

  const wallets = await fetchWithAuth(`${API_URL}${apiUrls.wallets.getAll}`);
  setCachedData(cacheKey, wallets);
  return wallets;
}

export async function getWalletById(id: string): Promise<Wallet> {
  const cacheKey = `wallet_${id}`;
  const cachedWallet = getCachedData<Wallet>(cacheKey);

  if (cachedWallet) {
    return cachedWallet;
  }

  const wallet = await fetchWithAuth(
    `${API_URL}${apiUrls.wallets.getById(id)}`
  );
  setCachedData(cacheKey, wallet);
  return wallet;
}

export async function createWallet(
  wallet: Omit<Wallet, "id">
): Promise<Wallet> {
  const newWallet = await fetchWithAuth(`${API_URL}${apiUrls.wallets.create}`, {
    method: "POST",
    body: JSON.stringify(wallet),
  });
  invalidateWalletCache();
  return newWallet;
}

export async function updateWallet(
  id: string,
  wallet: Partial<Wallet>
): Promise<Wallet> {
  const updatedWallet = await fetchWithAuth(
    `${API_URL}${apiUrls.wallets.putById(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(wallet),
    }
  );
  setCachedData(`wallet_${id}`, updatedWallet);
  return updatedWallet;
}

export async function deleteWallet(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}${apiUrls.wallets.deleteById(id)}`, {
    method: "DELETE",
  });
  cache.delete(`wallet_${id}`);
  invalidateWalletCache();
}

function invalidateWalletCache() {
  cache.delete("allWallets");
}
