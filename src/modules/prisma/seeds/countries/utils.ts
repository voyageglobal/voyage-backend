import { Prisma } from "@prisma/client"

export type CountryCreateInput = Omit<Prisma.CountryCreateInput, "images" | "cities" | "guides">
