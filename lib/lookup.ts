/* eslint-disable @typescript-eslint/no-explicit-any */
export const lookup = ({
  data,
  name,
  fields = ["name", "description", "categoryName"],
}: {
  data: any[];
  name: {
    name: string;
  };
  fields?: string[];
}): any[] => {
  if (!data || data.length === 0) {
    return [];
  }

  const filter = (item: any) => {
    const searchTerm = name.name?.toLowerCase();
    return fields.some((field) => {
      const value = item[field];
      return (
        typeof value === "string" && value.toLowerCase().includes(searchTerm)
      );
    });
  };

  const result = data.filter(filter);

  if (result.length) {
    const uniqueResults = Object.values(
      result.reduce((acc: any, datum: any) => {
        const itemName =
          datum.name?.toLowerCase() || datum.categoryName?.toLowerCase();
        if (itemName && !acc[itemName]) {
          acc[itemName] = datum;
        }
        return acc;
      }, {})
    ).slice(0, 3);

    return uniqueResults;
  }

  return [];
};
