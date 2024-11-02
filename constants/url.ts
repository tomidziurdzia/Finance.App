import { getRangeDateForFilter } from "./date";
import { views } from "./table";

export const getApiUrl = (
  filterKey: string,
  apiPath: string,
  categories: string[] = [],
  isNotRange = false
) => {
  if (isNotRange) {
    return `/api/${apiPath}`;
  }

  if (filterKey === views.all.key) {
    return `/api/${apiPath}?categories=${categories?.join(",")}`;
  }

  const [start, end] = getRangeDateForFilter(filterKey);
  return `/api/${apiPath}?from=${start}&to=${end}&categories=${categories?.join(
    ","
  )}`;
};
