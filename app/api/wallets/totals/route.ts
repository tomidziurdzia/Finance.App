import { getWalletTotals } from "@/app/actions/wallets";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totals = await getWalletTotals();
    return NextResponse.json(totals);
  } catch (error) {
    console.error("Error fetching wallet totals:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
