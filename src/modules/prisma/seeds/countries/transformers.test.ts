import { InputCountySchemaType } from "./schema"
import { transformSeedInputToOutput } from "./transformers"

describe("countries transformers", () => {
  describe("transformSeedInputToOutput", () => {
    it("should return empty array if input == null", () => {
      const result = transformSeedInputToOutput(null)
      expect(result).toEqual([])
    })

    it("should return empty array if input == undefined", () => {
      const result = transformSeedInputToOutput(undefined)
      expect(result).toEqual([])
    })

    it("should return empty array if empty array has passed", () => {
      const result = transformSeedInputToOutput([])
      expect(result).toEqual([])
    })

    it("should return array containing 1 transformed item", () => {
      const inputCountry: InputCountySchemaType = {
        id: 1,
        iso3: "CAN",
        name: "Country",
        emoji: "🇨🇦",
        capital: "Capital",
      }
      const input = [inputCountry]
      const result = transformSeedInputToOutput(input)
      expect(result).toEqual([
        {
          name: "Country",
          flag: "🇨🇦",
          description: "Capital",
        },
      ])
    })

    it("should return array containing 1 transformed item with empty flag value", () => {
      const inputCountry: InputCountySchemaType = {
        id: 1,
        iso3: "CAN",
        name: "Country",
        emoji: undefined,
        capital: "Capital",
      }
      const input = [inputCountry]
      const result = transformSeedInputToOutput(input)
      expect(result).toEqual([
        {
          name: "Country",
          flag: "",
          description: "Capital",
        },
      ])
    })
  })
})
