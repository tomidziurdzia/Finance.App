import { NextResponse } from "next/server";
import { deleteTransaction } from "@/app/actions/transactions";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Transaction ID is required" },
      { status: 400 }
    );
  }

  try {
    await deleteTransaction(id);
    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
