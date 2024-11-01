"use server";

import { cookies } from "next/headers";
import { TotalWallets, Wallet, Wallets } from "@/interfaces/walletInterface";

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

export async function getAllWallets(): Promise<Wallets> {
  return fetchWithAuth(`${API_URL}/wallets`);
}

export async function getWalletById(id: string): Promise<Wallet> {
  return fetchWithAuth(`${API_URL}/wallets/${id}`);
}

export async function getWalletTotals(): Promise<TotalWallets> {
  return fetchWithAuth(`${API_URL}/wallets/totals`);
}
