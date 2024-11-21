import { apiUrls } from "lib/apiUrls";
import fetchWithAuth from "lib/fetchWithAuth";
import { format, parse, isValid } from "date-fns";
import {
  Investment,
  InvestmentsDto,
  NewTransaction,
} from "interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formatDate = (date: string): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return isValid(parsedDate) ? format(parsedDate, "MM-dd-yyyy") : "";
};

export async function getInvestments(params: {
  startDate?: string;
  endDate?: string;
}): Promise<InvestmentsDto> {
  const { startDate, endDate } = params;

  const startDateFormatted = startDate ? formatDate(startDate) : "";
  const endDateFormatted = endDate ? formatDate(endDate) : "";

  if (!startDateFormatted || !endDateFormatted) {
    throw new Error("Invalid date format. Please use YYYY-MM-DD.");
  }

  const url = `${API_URL}${apiUrls.investments.getInvestments({
    startDate: startDateFormatted,
    endDate: endDateFormatted,
  })}`;

  try {
    const response = await fetchWithAuth(url);
    return response as InvestmentsDto;
  } catch (error) {
    console.error("Error fetching investments:", error);
    throw new Error("Failed to fetch investments. Please try again later.");
  }
}

export async function createInvestment(
  data: NewTransaction
): Promise<Investment> {
  try {
    const response = await fetchWithAuth(
      `${API_URL}${apiUrls.investments.create}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return response as Investment;
  } catch (error) {
    console.error("Error creating investment:", error);
    throw new Error("Failed to create investment. Please try again later.");
  }
}
