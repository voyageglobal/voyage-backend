import { CountryCreateInput, InputCountySchemaType } from "./schema"

export function transformSeedInputToOutput(input: InputCountySchemaType[]): CountryCreateInput[] {
  return input.map(countryInput => {
    const dbCountry: CountryCreateInput = {
      name: countryInput.name,
      flag: countryInput.emoji,
      description: countryInput.capital,
    }

    return dbCountry
  })
}
