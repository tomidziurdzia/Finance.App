import { Overview } from "interfaces/transactionInterface";
import { apiUrls } from "lib/apiUrls";
import fetchWithAuth from "lib/fetchWithAuth";
import { format, parse, isValid } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formatDate = (date: string): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return isValid(parsedDate) ? format(parsedDate, "MM-dd-yyyy") : "";
};

export async function getOverviews(params: {
  startDate?: string;
  endDate?: string;
}): Promise<Overview[]> {
  const { startDate, endDate } = params;

  const startDateFormatted = startDate ? formatDate(startDate) : "";
  const endDateFormatted = endDate ? formatDate(endDate) : "";

  if (!startDateFormatted || !endDateFormatted) {
    throw new Error("Invalid date format. Please use YYYY-MM-DD.");
  }

  const url = `${API_URL}${apiUrls.overviews.getOverviews({
    startDate: startDateFormatted,
    endDate: endDateFormatted,
  })}`;

  try {
    const response = await fetchWithAuth(url);
    return response as Overview[];
  } catch (error) {
    console.error("Error fetching overviews:", error);
    throw error;
  }
}
