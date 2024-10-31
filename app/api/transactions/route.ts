"use server";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  TransactionRequest,
  Transaction,
} from "@/interfaces/transactionInterface";
import { apiUrls } from "@/lib/apiUrls";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createTransaction(
  data: TransactionRequest
): Promise<Transaction> {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_URL}/${apiUrls.transactions}`, {
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

export async function POST(request: Request) {
  try {
    const data: TransactionRequest = await request.json();
    const transaction = await createTransaction(data);
    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
