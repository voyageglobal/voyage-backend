import { Prisma } from "@prisma/client"

/**
 * Returns the search string filter object for the guides query
 * Search is performed by guide name and guide categories name
 * @param searchString - The search string
 * @returns The search string filter object for the guides query
 */
export function getGuidesSearchStringFilter(
  searchString: string | null | undefined,
): Prisma.GuideFindManyArgs["where"] {
  return searchString
    ? {
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
    : {}
}
