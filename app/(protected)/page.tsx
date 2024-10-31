import { DatePickerProvider } from "@/components/context/datepicker-provider";
import { OverviewContextProvider } from "@/components/context/overview-provider";
import LayoutHeader from "@/components/layout/header";

export default async function Page() {
  return (
    <>
      <DatePickerProvider>
        <OverviewContextProvider>
          <LayoutHeader title="overview" showDatePicker={true} />
        </OverviewContextProvider>
      </DatePickerProvider>
    </>
  );
}
