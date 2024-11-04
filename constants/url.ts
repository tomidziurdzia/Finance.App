import { getRangeDateForFilter } from "./date";
import { views } from "./table";

export const getApiUrl = (
  filterKey: string,
  id: string,
  categories: string[] = [],
  isNotRange = false
) => {
  if (!isNotRange) {
    const baseUrl = `api/wallets/${id}`;
    return baseUrl;
  }

  if (filterKey === views.all.key) {
    return `/api/${id}?categories=${categories?.join(",")}`;
  }

  const [start, end] = getRangeDateForFilter(filterKey);
  return `/api/${id}?from=${start}&to=${end}&categories=${categories?.join(
    ","
  )}`;
};
