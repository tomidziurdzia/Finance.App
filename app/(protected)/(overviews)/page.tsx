import { DatePickerProvider } from "components/context/datepicker-provider";
import { OverviewContextProvider } from "components/context/overview-provider";
import LayoutHeader from "components/layout/header";
import OverviewsSummary from "./overviews-summary";
import WalletsSummary from "./wallets-summary";
import IncomesSummary from "./incomes-summary";
import ExpensesSummary from "./expenses-summary";
import InvestmentsSummary from "./investments-summary";

export default async function Page() {
  return (
    <DatePickerProvider>
      <OverviewContextProvider>
        <LayoutHeader title="overview" showDatePicker={true} />
        <div className="p-4 pt-4 flex flex-col gap-4">
          <OverviewsSummary />
          <WalletsSummary />
          <IncomesSummary />
          <ExpensesSummary />
          <InvestmentsSummary />
        </div>
      </OverviewContextProvider>
    </DatePickerProvider>
  );
}
