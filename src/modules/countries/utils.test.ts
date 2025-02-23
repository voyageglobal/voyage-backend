import { CountriesSortOrder } from "./dto/get-countries-query.dto"
import { getCountriesQueryOrderBy, getSearchStringFilter } from "./utils"

describe("Countries service utils", () => {
  describe("getSearchStringFilter", () => {
    it("should return an empty object if searchString is null", () => {
      const result = getSearchStringFilter(null)
      expect(result).toEqual({})
    })

    it("should return an object with the correct filter if searchString is provided", () => {
      const result = getSearchStringFilter("test")
      expect(result).toEqual({
        OR: [
          {
            name: {
              startsWith: "test",
              mode: "insensitive",
            },
          },
        ],
      })
    })
  })

  describe("getCountriesQueryOrderBy", () => {
    it("should return an empty object if sortOrder is null", () => {
      const result = getCountriesQueryOrderBy(null)
      expect(result).toEqual({})
    })

    it("should return an object with the correct orderBy if sortOrder is provided", () => {
      const result = getCountriesQueryOrderBy(CountriesSortOrder.NAME_ASC)
      expect(result).toEqual({ name: "asc" })
    })
  })
})
