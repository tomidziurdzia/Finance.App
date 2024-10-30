import categoryService from "@/lib/category-service";
import walletService from "@/lib/wallet-service";
import { Suspense } from "react";
import Loading from "../Loading/Loading";
import AddForm from "./AddForm";

export default async function AddTransaction() {
  const [categories, wallets] = await Promise.all([
    categoryService.getAll(),
    walletService.getAll(),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <AddForm initialCategories={categories} initialWallets={wallets} />
    </Suspense>
  );
}
