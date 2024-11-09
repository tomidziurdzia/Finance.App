import { DataContextProvider } from "components/context/data-provider";
import LayoutHeader from "components/layout/header";
import InvestmentSummary from "./summary";
import InvestmentTable from "./table";

export default function Page() {
  return (
    <>
      <LayoutHeader title="investment" />
      <DataContextProvider name="investments">
        <div className="w-full overflow-x-auto p-4">
          <InvestmentSummary />
          <InvestmentTable />
        </div>
      </DataContextProvider>
    </>
  );
}
