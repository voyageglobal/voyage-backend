import { extractSeedDataFromFile, validateSeedData, validateSeedPath } from "../utils"
import { createSeedProcessor } from "../utils/seed-processor"
import { CITIES_SEED_PATH } from "./constants"
import { inputCitySchema, outputCitySchema, CityCreateManyInput, InputCitySchemaType } from "./schema"
import { splitOutputDataIntoChunks, transformSeedInputToOutput } from "./transformers"

export const processCitiesSeed = createSeedProcessor<InputCitySchemaType, CityCreateManyInput>({
  validators: {
    seedPathValidator: () => validateSeedPath(CITIES_SEED_PATH),
    seedInputDataValidator: (data: InputCitySchemaType[]) => validateSeedData(data, inputCitySchema),
    seedOutputDataValidator: (data: CityCreateManyInput[]) => validateSeedData(data, outputCitySchema),
  },
  transformers: {
    transformInput: transformSeedInputToOutput,
  },
  seedDataExtractor: () => extractSeedDataFromFile(CITIES_SEED_PATH),
  onProcessSeed: async function handleProcess(prisma, rawData): Promise<boolean> {
    const chunks = splitOutputDataIntoChunks(rawData, 10000)

    console.log("Processing cities seed...")
    let total = 0
    for (const chunk of chunks) {
      const { count } = await prisma.city.createMany({
        data: chunk,
        skipDuplicates: true,
      })

      total += count

      console.log(`Processed ${count}/${rawData.length} cities`)
    }
    console.log("Cities seed processed successfully")

    return total > 0
  },
})
