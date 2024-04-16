import { extractSeedDataFromFile, validateSeedData, validateSeedPath } from "../utils"
import { createSeedProcessor } from "../utils/seed-processor"
import { CITIES_SEED_PATH } from "./constants"
import {
  inputCitySchema,
  outputCitySchema,
  CityCreateManyInputExtended,
  InputCitySchemaType,
  CityCreateManyInput,
} from "./schema"
import { splitOutputDataIntoChunks, transformSeedInputToOutput } from "./transformers"

export const processCitiesSeed = createSeedProcessor<InputCitySchemaType, CityCreateManyInputExtended>({
  validators: {
    seedPathValidator: () => validateSeedPath(CITIES_SEED_PATH),
    seedInputDataValidator: (data: InputCitySchemaType[]) => validateSeedData(data, inputCitySchema),
    seedOutputDataValidator: (data: CityCreateManyInputExtended[]) => validateSeedData(data, outputCitySchema),
  },
  transformers: {
    transformInput: transformSeedInputToOutput,
  },
  seedDataExtractor: () => extractSeedDataFromFile(CITIES_SEED_PATH),
  onProcessSeed: async function handleProcess(prisma, rawData): Promise<boolean> {
    console.log("Processing cities seed...")

    const [total] = await prisma.$transaction(
      async tx => {
        let totalChanges = 0

        await tx.city.deleteMany()

        const countries = await tx.country.findMany()

        const chunks = splitOutputDataIntoChunks(rawData, 30000)

        for (const chunk of chunks) {
          // Connect cities with countries
          const createChunk: CityCreateManyInput[] = chunk.map<CityCreateManyInput>(cityExtended => {
            return {
              name: cityExtended.name,
              description: cityExtended.description,
              countryId: countries.find(c => c.iso2Code === cityExtended.country_code)?.id,
            } satisfies CityCreateManyInput
          })

          const { count } = await tx.city.createMany({
            data: createChunk,
            skipDuplicates: true,
          })

          totalChanges += count

          console.log(`Processed (create) ${totalChanges}/${rawData.length} cities`)
        }

        return [totalChanges]
      },
      { timeout: 1000 * 60 * 10 },
    )
    console.log("Cities seed processed successfully")

    return total > 0
  },
})
