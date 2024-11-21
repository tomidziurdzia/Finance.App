"use server";

import { Wallet, Wallets } from "interfaces/walletInterface";
import { apiUrls } from "lib/apiUrls";
import fetchWithAuth from "lib/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getAllWallets(): Promise<Wallets> {
  try {
    const response = await fetchWithAuth(`${API_URL}${apiUrls.wallets.getAll}`);
    return response as Wallets;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw new Error("Failed to fetch wallets. Please try again later.");
  }
}

export async function getWalletById(id: string): Promise<Wallet> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.wallets.getById(id)}`
    );
    return response as Wallet;
  } catch (error) {
    console.error(`Error fetching wallet with ID ${id}:`, error);
    throw new Error("Failed to fetch wallet. Please try again later.");
  }
}

export async function createWallet(
  wallet: Omit<Wallet, "id">
): Promise<Wallet> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.wallets.create}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wallet),
      }
    );
    return response as Wallet;
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw new Error("Failed to create wallet. Please try again later.");
  }
}

export async function updateWallet(
  id: string,
  wallet: Partial<Wallet>
): Promise<Wallet> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.wallets.putById(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wallet),
      }
    );
    return response as Wallet;
  } catch (error) {
    console.error(`Error updating wallet with ID ${id}:`, error);
    throw new Error("Failed to update wallet. Please try again later.");
  }
}

export async function deleteWallet(id: string): Promise<void> {
  try {
    await fetchWithAuth(`${API_URL}${apiUrls.wallets.deleteById(id)}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting wallet with ID ${id}:`, error);
    throw new Error("Failed to delete wallet. Please try again later.");
  }
}
