import { getCitiesQueryOrderBy, getSearchStringFilter } from "./utils"
import { CitiesSortOrder } from "./dto/get-cities-query.dto"

describe("Cities service utils", () => {
  describe("getCitiesQueryOrderBy function", () => {
    it("should return guides count ascending for POPULARITY_ASC sortOrder", () => {
      const result = getCitiesQueryOrderBy(CitiesSortOrder.POPULARITY_ASC)
      expect(result).toEqual({ guides: { _count: "asc" } })
    })

    it("should return guides count descending for POPULARITY_DESC sortOrder", () => {
      const result = getCitiesQueryOrderBy(CitiesSortOrder.POPULARITY_DESC)
      expect(result).toEqual({ guides: { _count: "desc" } })
    })

    it("should return name ascending for NAME_ASC sortOrder", () => {
      const result = getCitiesQueryOrderBy(CitiesSortOrder.NAME_ASC)
      expect(result).toEqual({ name: "asc" })
    })

    it("should return name descending for NAME_DESC sortOrder", () => {
      const result = getCitiesQueryOrderBy(CitiesSortOrder.NAME_DESC)
      expect(result).toEqual({ name: "desc" })
    })

    it("should return name ascending for null sortOrder", () => {
      const result = getCitiesQueryOrderBy(null)
      expect(result).toEqual({ name: "asc" })
    })
  })

  describe("getSearchStringFilter function", () => {
    it("should return empty object if search string is not provided", () => {
      const result = getSearchStringFilter(null)
      expect(result).toEqual({})
    })

    it("should return 'where' filter if search is provided", () => {
      const result = getSearchStringFilter("test")
      expect(result).toEqual({
        OR: [
          {
            name: {
              startsWith: "test",
              mode: "insensitive",
            },
          },
          {
            country: {
              name: {
                startsWith: "test",
                mode: "insensitive",
              },
            },
          },
        ],
      })
    })
  })
})
