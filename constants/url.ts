import { format, isValid, parse } from "date-fns";
import { getRangeDateForFilter } from "./date";
import { views } from "./table";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formatDate = (date: string): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return isValid(parsedDate) ? format(parsedDate, "MM-dd-yyyy") : "";
};

export const getApiUrl = (
  filterKey: string,
  apiPath: string,
  categories: string[] = [],
  isNotRange = false
) => {
  if (isNotRange) {
    return `${API_URL}/${apiPath}`;
  }
  if (filterKey === views.all.key) {
    return `${API_URL}/${apiPath}?categories=${categories?.join(",")}`;
  }

  const [start, end] = getRangeDateForFilter(filterKey);
  const startDateFormatted = start ? formatDate(start) : "";
  const endDateFormatted = end ? formatDate(end) : "";

  let url = `${API_URL}/${apiPath}?startDate=${startDateFormatted}&endDate=${endDateFormatted}`;

  if (categories.length > 0) {
    const categoryParams = categories
      .map((id) => `categoryIds=${id}`)
      .join("&");
    url += `&${categoryParams}`;
  }

  return url;
};
