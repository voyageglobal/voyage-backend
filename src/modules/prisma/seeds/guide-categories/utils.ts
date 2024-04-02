import { Prisma } from "@prisma/client"
import { getSchemaValidator } from "../utils"
import { schema } from "./schema"

const validate = getSchemaValidator(schema)

export type GuideCategoryCreateInput = Omit<Prisma.GuideCategoryCreateInput, "guides">
