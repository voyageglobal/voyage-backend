import { Prisma } from "@prisma/client"
import { CitiesSortOrder } from "./dto/get-cities-query.dto"

export function getCitiesQueryOrderBy(sortOrder: CitiesSortOrder | null): Prisma.CityFindManyArgs["orderBy"] {
  switch (sortOrder) {
    case CitiesSortOrder.POPULARITY_ASC:
      return {
        guides: {
          _count: "asc",
        },
      }
    case CitiesSortOrder.POPULARITY_DESC:
      return {
        guides: {
          _count: "desc",
        },
      }
    case CitiesSortOrder.NAME_ASC:
      return { name: "asc" }
    case CitiesSortOrder.NAME_DESC:
      return { name: "desc" }
    default:
      return { name: "asc" }
  }
}

export function getSearchStringFilter(searchString: string | null | undefined): Prisma.CityFindManyArgs["where"] {
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
            country: {
              name: {
                startsWith: searchString,
                mode: "insensitive",
              },
            },
          },
        ],
      }
    : {}
}

export function getFilterByCountries(countries: string[] | null | undefined): Prisma.CityFindManyArgs["where"] {
  return countries
    ? {
        countryId: {
          in: countries,
        },
      }
    : {}
}

export function getFilterOnlyWithGuides(onlyWithGuides: boolean | null | undefined): Prisma.CityFindManyArgs["where"] {
  return onlyWithGuides
    ? {
        guides: {
          some: {
            deleted: false,
          },
        },
      }
    : {}
}
