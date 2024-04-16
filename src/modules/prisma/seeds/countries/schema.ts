// How to generate schema correctly:
// 1. Enable strictNullChecks in tsconfig.json
// 2. Put JSONSchemaType<YOUR_TYPE> type in schema variable
// 3. Put satisfies JSONSchemaType<YOUR_TYPE> at the end of schema variable
// 4. Fix all errors in schema variable
// 5. Remove satisfies JSONSchemaType<YOUR_TYPE> from schema variable
// 6. Remove type from schema variable
// 7. Disable strictNullChecks in tsconfig.json

import { Prisma } from "@prisma/client"

export type InputCountySchemaType = {
  id: number
  name: string
  iso2: string
  iso3: string
  capital: string
  emoji: string
}

// Schema of input data
export const inputCountrySchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    iso3: { type: "string" },
    iso2: { type: "string" },
    capital: { type: "string" },
    emoji: { type: "string" },
  },
  required: ["id", "name", "iso2", "iso3", "capital", "emoji"],
} // satisfies JSONSchemaType<InputCountySchemaType>

export type CountryCreateInput = Omit<Prisma.CountryCreateManyInput, "images" | "cities" | "guides">
// Country entity
export const outputCountrySchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      nullable: true,
    },
    name: { type: "string", nullable: false },
    flag: { type: "string", nullable: false },
    description: { type: "string" },
    iso2Code: { type: "string" },

    createdAt: { type: "string", nullable: true },
    updatedAt: { type: "string", nullable: true },
    deleted: { type: "boolean", nullable: true },
  },
  required: ["name", "flag"],
} // satisfies JSONSchemaType<CountryCreateInput>
