import { NextRequest, NextResponse } from "next/server";
import { getWalletById } from "@/app/actions/wallets";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const wallet = await getWalletById(id);
    if (wallet) {
      return NextResponse.json(wallet.transactions);
    } else {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
