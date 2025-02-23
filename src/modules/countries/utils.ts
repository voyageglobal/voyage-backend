import { Prisma } from "@prisma/client"
import { CountriesSortOrder } from "./dto/get-countries-query.dto"

export const getSearchStringFilter = (searchString: string | null | undefined): Prisma.CountryFindManyArgs["where"] => {
  if (!searchString) return {}

  return {
    OR: [
      {
        name: {
          startsWith: searchString,
          mode: "insensitive",
        },
      },
    ],
  }
}

export const getCountriesQueryOrderBy = (
  sortOrder: CountriesSortOrder | null,
): Prisma.CountryFindManyArgs["orderBy"] => {
  if (!sortOrder) return {}

  switch (sortOrder) {
    case CountriesSortOrder.NAME_ASC:
      return { name: "asc" }
    case CountriesSortOrder.NAME_DESC:
      return { name: "desc" }
  }
}
