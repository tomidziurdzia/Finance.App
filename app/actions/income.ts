import { Income, NewTransaction } from "interfaces/transactionInterface";
import { apiUrls } from "lib/apiUrls";
import fetchWithAuth from "lib/fetchWithAuth";
import { format, parse, isValid } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formatDate = (date: string): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return isValid(parsedDate) ? format(parsedDate, "MM-dd-yyyy") : "";
};

export async function getIncomes(params: {
  startDate?: string;
  endDate?: string;
}): Promise<Income[]> {
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
    return response as Income[];
  } catch (error) {
    console.error("Error fetching incomes:", error);
    throw error;
  }
}

export async function createIncome(data: NewTransaction): Promise<Income> {
  const income = await fetchWithAuth(`${API_URL}${apiUrls.incomes.create}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return income;
}
