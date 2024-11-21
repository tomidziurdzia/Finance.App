import { apiUrls } from "lib/apiUrls";
import fetchWithAuth from "lib/fetchWithAuth";
import { format, parse, isValid } from "date-fns";
import { Income, IncomesDto, NewTransaction } from "interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formatDate = (date: string): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return isValid(parsedDate) ? format(parsedDate, "MM-dd-yyyy") : "";
};

export async function getIncomes(params: {
  startDate?: string;
  endDate?: string;
}): Promise<IncomesDto> {
  const { startDate, endDate } = params;

  const startDateFormatted = startDate ? formatDate(startDate) : "";
  const endDateFormatted = endDate ? formatDate(endDate) : "";

  if (!startDateFormatted || !endDateFormatted) {
    throw new Error("Invalid date format. Please use YYYY-MM-DD.");
  }

  const url = `${API_URL}${apiUrls.incomes.getIncomes({
    startDate: startDateFormatted,
    endDate: endDateFormatted,
  })}`;

  try {
    const response = await fetchWithAuth(url);
    return response as IncomesDto;
  } catch (error) {
    console.error("Error fetching incomes:", error);
    throw new Error("Failed to fetch incomes. Please try again later.");
  }
}

export async function createIncome(data: NewTransaction): Promise<Income> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.incomes.create}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response as Income;
  } catch (error) {
    console.error("Error creating income:", error);
    throw new Error("Failed to create income. Please try again later.");
  }
}
