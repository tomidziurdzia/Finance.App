import { Suspense } from "react";
import Loading from "../Loading/Loading";
import AddForm from "./AddForm";
import { getAllWallets } from "@/app/actions/wallets";
import { getAllCategories } from "@/app/actions/category";

export default async function AddTransaction() {
  const [categories, wallets] = await Promise.all([
    getAllCategories(),
    getAllWallets(),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <AddForm initialCategories={categories} initialWallets={wallets} />
    </Suspense>
  );
}
