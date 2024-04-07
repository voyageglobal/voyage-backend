import { extractSeedDataFromFile, validateSeedData, validateSeedPath } from "../utils"
import { createSeedProcessor } from "../utils/seed-processor"
import { COUNTRIES_SEED_PATH } from "./constants"
import { inputCountrySchema, outputCountrySchema, CountryCreateInput, InputCountySchemaType } from "./schema"
import { transformSeedInputToOutput } from "./transformers"

export const processCountriesSeed = createSeedProcessor<InputCountySchemaType, CountryCreateInput>({
  validators: {
    seedPathValidator: () => validateSeedPath(COUNTRIES_SEED_PATH),
    seedInputDataValidator: (data: InputCountySchemaType[]) => validateSeedData(data, inputCountrySchema),
    seedOutputDataValidator: (data: CountryCreateInput[]) => validateSeedData(data, outputCountrySchema),
  },
  transformers: {
    transformInput: transformSeedInputToOutput,
  },
  seedDataExtractor: () => extractSeedDataFromFile(COUNTRIES_SEED_PATH),
  onProcessSeed: async function handleProcess(prisma, data): Promise<boolean> {
    const { count } = await prisma.country.createMany({
      data: data,
      skipDuplicates: true,
    })

    return count > 0
  },
})
