import { Prisma } from "@prisma/client"
import { DEFAULT_FILTER_OUTPUT } from "./constants"
import { isValidFilterInput } from "./utils"

/**
 * Returns the search string filter object for the guides query
 * Search is performed by guide name and guide categories name
 * @param searchString - The search string
 * @returns The search string filter object for the guides query
 */
export function buildGuidesSearchStringFilter(
  searchString: string | null | undefined,
): Prisma.GuideFindManyArgs["where"] {
  if (!isValidFilterInput(searchString)) {
    return DEFAULT_FILTER_OUTPUT
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
  if (!isValidFilterInput(categoryKeys)) {
    return DEFAULT_FILTER_OUTPUT
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

/**
 * Returns the filter object for the guides query
 * Filters by cities
 * @param ids - The cities ids
 * @returns The filter object for the guides query
 */
export function buildGuideCitiesFilter(ids: string[]): Prisma.GuideFindManyArgs["where"] {
  if (!isValidFilterInput(ids)) {
    return DEFAULT_FILTER_OUTPUT
  }

  return {
    cities: {
      some: {
        id: {
          in: ids,
        },
      },
    },
  }
}

/**
 * Returns the filter object for the guides query
 * Filters by countries
 * @param ids - The countries ids
 * @returns The filter object for the guides query
 */
export function buildGuideCountriesFilter(ids: string[]): Prisma.GuideFindManyArgs["where"] {
  if (!isValidFilterInput(ids)) {
    return DEFAULT_FILTER_OUTPUT
  }

  return {
    countries: {
      some: {
        id: {
          in: ids,
        },
      },
    },
  }
}
