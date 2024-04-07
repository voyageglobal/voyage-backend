// How to generate schema correctly:
// 1. Enable strictNullChecks in tsconfig.json
// 2. Put JSONSchemaType<YOUR_TYPE> type in schema variable
// 3. Put satisfies JSONSchemaType<YOUR_TYPE> at the end of schema variable
// 4. Fix all errors in schema variable
// 5. Remove satisfies JSONSchemaType<YOUR_TYPE> from schema variable
// 6. Remove type from schema variable
// 7. Disable strictNullChecks in tsconfig.json

import { Prisma } from "@prisma/client"

export type GuideCategoryCreateInput = Omit<Prisma.GuideCategoryCreateInput, "guides">

export const schema = {
  type: "object",
  properties: {
    key: { type: "string" },
    name: { type: "string" },
    imageUrl: { type: "string" },
    deleted: { type: "boolean", nullable: true },
    createdAt: { type: "string", nullable: true },
    updatedAt: { type: "string", nullable: true },
  },
  required: ["key", "name", "imageUrl"],
} as const
