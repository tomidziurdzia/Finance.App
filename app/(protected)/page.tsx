import { DatePickerProvider } from "@/components/context/datepicker-provider";
import { OverviewContextProvider } from "@/components/context/overview-provider";
import LayoutHeader from "@/components/layout/header";
import Summary from "./summary";

export default async function Page() {
  return (
    <>
      <DatePickerProvider>
        <OverviewContextProvider>
          <LayoutHeader title="overview" showDatePicker={true} />
          <div className="p-4 pt-4">
            <Summary />
          </div>
        </OverviewContextProvider>
      </DatePickerProvider>
    </>
  );
}
