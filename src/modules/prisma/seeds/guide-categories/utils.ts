import { Prisma } from "@prisma/client"

export type GuideCategoryCreateInput = Omit<Prisma.GuideCategoryCreateInput, "guides">
