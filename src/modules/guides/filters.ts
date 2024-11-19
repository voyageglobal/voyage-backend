import { Prisma } from "@prisma/client"

/**
 * Returns the search string filter object for the guides query
 * Search is performed by guide name and guide categories name
 * @param searchString - The search string
 * @returns The search string filter object for the guides query
 */
export function buildGuidesSearchStringFilter(
  searchString: string | null | undefined,
): Prisma.GuideFindManyArgs["where"] {
  if (!searchString) {
    return {}
  }

  return {
    OR: [
      {
        name: {
          startsWith: searchString,
          mode: "insensitive",
        },
      },
      {
        categories: {
          some: {
            name: {
              startsWith: searchString,
              mode: "insensitive",
            },
          },
        },
      },
    ],
  }
}

/**
 * Returns the filter object for the guides query
 * Filters by guide categories
 * @param categoryKeys - The category keys
 * @returns The filter object for the guides query
 */
export function buildGuideCategoriesFilter(
  categoryKeys: string[] | null | undefined,
): Prisma.GuideFindManyArgs["where"] {
  if (!categoryKeys) {
    return {}
  }

  if (categoryKeys.length === 0) {
    return {}
  }

  return {
    categories: {
      some: {
        key: {
          in: categoryKeys,
        },
      },
    },
  }
}
