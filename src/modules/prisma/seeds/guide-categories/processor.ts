import { PrismaClient } from "@prisma/client"
import { validateSeedInputData, validateSeedPath, extractSeedDataFromFile } from "../utils"
import { GUIDE_CATEGORIES_SEED_PATH } from "./constants"
import { schema } from "./schema"
import { GuideCategoryCreateInput } from "./utils"

export async function processGuideCategoriesSeed(prisma: PrismaClient): Promise<boolean> {
  const isPathValid = validateSeedPath(GUIDE_CATEGORIES_SEED_PATH)

  if (!isPathValid) {
    throw new Error(`Invalid seed path: ${GUIDE_CATEGORIES_SEED_PATH}`)
  }

  const guideCategories = extractSeedDataFromFile<GuideCategoryCreateInput>(GUIDE_CATEGORIES_SEED_PATH)

  const isValid = validateSeedInputData(guideCategories, schema)

  if (!isValid) {
    throw new Error("Invalid seed data")
  }

  const { count } = await prisma.guideCategory.createMany({
    data: guideCategories,
    skipDuplicates: true,
  })

  return count > 0
}
