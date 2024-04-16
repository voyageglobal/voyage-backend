// How to generate schema correctly:
// 1. Enable strictNullChecks in tsconfig.json
// 2. Put JSONSchemaType<YOUR_TYPE> type in schema variable
// 3. Put satisfies JSONSchemaType<YOUR_TYPE> at the end of schema variable
// 4. Fix all errors in schema variable
// 5. Remove satisfies JSONSchemaType<YOUR_TYPE> from schema variable
// 6. Remove type from schema variable
// 7. Disable strictNullChecks in tsconfig.json

import { Prisma } from "@prisma/client"

export type InputCitySchemaType = {
  id: number
  name: string
  country_code: string
}

// Schema of input data
export const inputCitySchema = {
  type: "object",
  properties: {
    id: { type: "number", nullable: false },
    name: { type: "string", nullable: false },
    country_code: { type: "string", nullable: true },
  },
  required: ["id", "name", "country_code"],
} // satisfies JSONSchemaType<InputCitySchemaType>

export type CityCreateManyInput = Omit<Prisma.CityCreateManyInput, "guides" | "images">
export type CityCreateManyInputExtended = CityCreateManyInput & { country_code: string }
// Country entity
export const outputCitySchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      nullable: true,
    },
    name: { type: "string", nullable: false },
    description: { type: "string", nullable: true },
    countryId: { type: "string", nullable: true },
    country_code: { type: "string", nullable: true },

    createdAt: { type: "string", nullable: true },
    updatedAt: { type: "string", nullable: true },
    deleted: { type: "boolean", nullable: true },
  },
  required: ["name"],
} // satisfies JSONSchemaType<CityCreateManyInputExtended>
