import { CityCreateManyInput, InputCitySchemaType } from "./schema"

export function transformSeedInputToOutput(input: InputCitySchemaType[]): CityCreateManyInput[] {
  if (!input) return []

  return input.map(cityInput => {
    const cityOutput: CityCreateManyInput = {
      name: cityInput?.name || "",
      description: "",
      countryId: null,
    }

    return cityOutput
  })
}

export function splitOutputDataIntoChunks(data: CityCreateManyInput[], chunkSize: number): CityCreateManyInput[][] {
  const chunks: CityCreateManyInput[][] = []

  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize))
  }

  return chunks
}
