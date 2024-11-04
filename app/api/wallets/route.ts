import { getAllWallets } from "@/app/actions/wallets";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wallets = await getAllWallets();
    return NextResponse.json(wallets);
  } catch (error) {
    console.error("Error fetching all wallets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
