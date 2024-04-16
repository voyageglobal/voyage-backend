import { CountryCreateInput, InputCountySchemaType } from "./schema"

export function transformSeedInputToOutput(input: InputCountySchemaType[]): CountryCreateInput[] {
  if (!input) return []

  return input.map(countryInput => {
    const dbCountry: CountryCreateInput = {
      name: countryInput?.name || "",
      flag: countryInput?.emoji || "",
      description: countryInput?.capital || "",
      iso2Code: countryInput?.iso2 || "",
    }

    return dbCountry
  })
}
