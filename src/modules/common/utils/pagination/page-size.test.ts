import { getValidPageSize } from "./page-size"

describe("page size utils", () => {
  describe("getValidPageSize", () => {
    it("should return the default page size when no page size provided", () => {
      const pageSize = getValidPageSize({
        pageSize: undefined,
        defaultPageSize: 10,
      })

      expect(pageSize).toBe(10)
    })

    it("should return the default page size when page size is less than 0", () => {
      const pageSize = getValidPageSize({
        pageSize: -1,
        defaultPageSize: 10,
      })

      expect(pageSize).toBe(10)
    })

    it("should return the default page size when page size is 0", () => {
      const pageSize = getValidPageSize({
        pageSize: 0,
        defaultPageSize: 10,
      })

      expect(pageSize).toBe(10)
    })

    it("should return the default page size when page size is greater than the max page size", () => {
      const pageSize = getValidPageSize({
        pageSize: 100,
        defaultPageSize: 10,
        maxPageSize: 50,
      })

      expect(pageSize).toBe(50)
    })

    it("should return the provided page size when it is valid", () => {
      const pageSize = getValidPageSize({
        pageSize: 20,
        defaultPageSize: 10,
      })

      expect(pageSize).toBe(20)
    })
  })
})
