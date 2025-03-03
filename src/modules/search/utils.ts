import { Prisma } from "@prisma/client"

export function getSearchStringFilter(searchString: string | null | undefined): Prisma.CityFindManyArgs["where"] {
  if (!searchString) return {}

  const filter = {
    OR: [
      {
        name: {
          startsWith: searchString,
          mode: "insensitive",
        },
      },
      {
        country: {
          name: {
            startsWith: searchString,
            mode: "insensitive",
          },
        },
      },
    ],
  } satisfies Prisma.CityFindManyArgs["where"]

  return filter
}
