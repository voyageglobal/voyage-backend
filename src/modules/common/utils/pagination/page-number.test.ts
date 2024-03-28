import { getValidPageNumber } from "./page-number"

describe("page number utils", () => {
  describe("getValidPageNumber", () => {
    it("should return the default page number when no page number provided", () => {
      const pageNumber = getValidPageNumber({
        page: undefined,
        defaultPage: 1,
      })

      expect(pageNumber).toBe(1)
    })

    it("should return the default page number when page number is less than 0", () => {
      const pageNumber = getValidPageNumber({
        page: -1,
        defaultPage: 1,
      })

      expect(pageNumber).toBe(1)
    })

    it("should return the default page number when page number is 0", () => {
      const pageNumber = getValidPageNumber({
        page: 0,
        defaultPage: 1,
      })

      expect(pageNumber).toBe(1)
    })

    it("should return the default page number when page number is greater than the max page number", () => {
      const pageNumber = getValidPageNumber({
        page: 100,
        defaultPage: 1,
        maxPage: 50,
      })

      expect(pageNumber).toBe(50)
    })

    it("should return the provided page number when it is valid", () => {
      const pageNumber = getValidPageNumber({
        page: 20,
        defaultPage: 1,
      })

      expect(pageNumber).toBe(20)
    })
  })
})
