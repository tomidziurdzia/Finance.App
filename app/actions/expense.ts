import { apiUrls } from "lib/apiUrls";
import fetchWithAuth from "lib/fetchWithAuth";
import { format, parse, isValid } from "date-fns";
import { Expense, ExpensesDto, NewTransaction } from "interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formatDate = (date: string): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return isValid(parsedDate) ? format(parsedDate, "MM-dd-yyyy") : "";
};

export async function getExpenses(params: {
  startDate?: string;
  endDate?: string;
}): Promise<ExpensesDto> {
  const { startDate, endDate } = params;

  const startDateFormatted = startDate ? formatDate(startDate) : "";
  const endDateFormatted = endDate ? formatDate(endDate) : "";

  if (!startDateFormatted || !endDateFormatted) {
    throw new Error("Invalid date format. Please use YYYY-MM-DD.");
  }

  const url = `${API_URL}${apiUrls.expenses.getExpenses({
    startDate: startDateFormatted,
    endDate: endDateFormatted,
  })}`;

  try {
    const response = await fetchWithAuth(url);
    return response as ExpensesDto;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error("Failed to fetch expenses. Please try again later.");
  }
}

export async function createExpense(data: NewTransaction): Promise<Expense> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.expenses.create}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return response as Expense;
  } catch (error) {
    console.error("Error creating expense:", error);
    throw new Error("Failed to create expense. Please try again later.");
  }
}
