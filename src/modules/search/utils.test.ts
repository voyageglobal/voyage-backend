import { getSearchStringFilter } from "./utils"

describe("getSearchStringFilter", () => {
  it("should return empty object when searchString is null", () => {
    const result = getSearchStringFilter(null)
    expect(result).toEqual({})
  })

  it("should return empty object when searchString is undefined", () => {
    const result = getSearchStringFilter(undefined)
    expect(result).toEqual({})
  })

  it("should return empty object when searchString is empty string", () => {
    const result = getSearchStringFilter("")
    expect(result).toEqual({})
  })

  it("should return correct filter when searchString is provided", () => {
    const searchString = "test"
    const result = getSearchStringFilter(searchString)

    expect(result).toEqual({
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
    })
  })
})
