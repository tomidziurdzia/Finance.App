import { getRangeDateForFilter } from "./date";
import { views } from "./table";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getApiUrl = (
  filterKey: string,
  apiPath: string,
  categories: string[] = [],
  isNotRange = false
) => {
  if (isNotRange) {
    return `${API_URL}${apiPath}`;
  }
  if (filterKey === views.all.key) {
    return `${API_URL}${apiPath}?categories=${categories?.join(",")}`;
  }
  const [start, end] = getRangeDateForFilter(filterKey);
  return `${API_URL}${apiPath}?from=${start}&to=${end}&categories=${categories?.join(
    ","
  )}`;
};
