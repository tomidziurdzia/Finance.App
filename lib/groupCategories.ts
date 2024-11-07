import { Category } from "interfaces/categoryInterface";

export interface GroupedCategories {
  [key: string]: Category[];
}

export function groupCategoriesByParentType(
  categories: Category[]
): GroupedCategories {
  return categories.reduce((acc: GroupedCategories, category) => {
    const { parentType } = category;
    if (!acc[parentType]) {
      acc[parentType] = [];
    }
    acc[parentType].push(category);
    return acc;
  }, {});
}
