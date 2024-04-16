import { InputCitySchemaType } from "./schema"
import { transformSeedInputToOutput } from "./transformers"

describe("cities transformers", () => {
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
      const inputCountry: InputCitySchemaType = {
        id: 1,
        name: "City",
        country_code: "C",
      }
      const input = [inputCountry]
      const result = transformSeedInputToOutput(input)
      expect(result).toEqual([
        {
          description: "",
          name: "City",
          countryId: null,
          country_code: "C",
        },
      ])
    })
  })
})
