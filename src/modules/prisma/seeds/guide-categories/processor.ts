import { extractSeedDataFromFile, validateSeedData, validateSeedPath } from "../utils"
import { createSeedProcessor } from "../utils/seed-processor"
import { GUIDE_CATEGORIES_SEED_PATH } from "./constants"
import { GuideCategoryCreateInput, schema } from "./schema"

export const processGuideCategoriesSeed = createSeedProcessor<GuideCategoryCreateInput>({
  validators: {
    seedPathValidator: () => validateSeedPath(GUIDE_CATEGORIES_SEED_PATH),
    seedInputDataValidator: (data: GuideCategoryCreateInput[]) => validateSeedData(data, schema),
  },
  seedDataExtractor: () => extractSeedDataFromFile(GUIDE_CATEGORIES_SEED_PATH),
  onProcessSeed: async function handleProcess(prisma, data): Promise<boolean> {
    const { count } = await prisma.guideCategory.createMany({
      data: data,
      skipDuplicates: true,
    })

    return count > 0
  },
})
