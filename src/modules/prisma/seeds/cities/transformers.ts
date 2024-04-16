import { CityCreateManyInputExtended, InputCitySchemaType } from "./schema"

export function transformSeedInputToOutput(input: InputCitySchemaType[]): CityCreateManyInputExtended[] {
  if (!input) return []

  return input.map(cityInput => {
    const cityOutput: CityCreateManyInputExtended = {
      name: cityInput?.name || "",
      description: "",
      countryId: null,
      country_code: cityInput?.country_code || "",
    }

    return cityOutput
  })
}

export function splitOutputDataIntoChunks(
  data: CityCreateManyInputExtended[],
  chunkSize: number,
): CityCreateManyInputExtended[][] {
  const chunks: CityCreateManyInputExtended[][] = []

  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize))
  }

  return chunks
}
