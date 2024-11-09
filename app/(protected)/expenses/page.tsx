import { DataContextProvider } from "components/context/data-provider";
import LayoutHeader from "components/layout/header";
import ExpenseSummary from "./summary";
import ExpenseTable from "./table";

export default function Page() {
  return (
    <>
      <LayoutHeader title="expense" />
      <DataContextProvider name="expenses">
        <div className="w-full overflow-x-auto p-4">
          <ExpenseSummary />
          <ExpenseTable />
        </div>
      </DataContextProvider>
    </>
  );
}
