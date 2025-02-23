import { transformCommaSeparatedStringToArray } from "./transform-string-to-array"

describe("transformCommaSeparatedStringToArray", () => {
  it("should return an array of strings", () => {
    const result = transformCommaSeparatedStringToArray("1,2,3")

    expect(result).toEqual(["1", "2", "3"])
  })

  it("should return an empty array if the string is empty", () => {
    const result = transformCommaSeparatedStringToArray("")

    expect(result).toEqual([])
  })

  it("should return an array of strings if the string is an array", () => {
    const result = transformCommaSeparatedStringToArray(["1", "2", "3"] as unknown as string)

    expect(result).toEqual(["1", "2", "3"])
  })
})
