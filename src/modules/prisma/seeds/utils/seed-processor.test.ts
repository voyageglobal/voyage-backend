import { PrismaClient } from "@prisma/client"
import { prismaMock } from "../../../../test-utils/prisma"
import { createSeedProcessor } from "./seed-processor"

describe("Seed processor", () => {
  let prisma: PrismaClient

  beforeEach(() => {
    prisma = prismaMock as unknown as PrismaClient
  })

  it("should return processor function", () => {
    const process = createSeedProcessor({
      validators: {
        seedPathValidator: () => true,
        seedOutputDataValidator: () => true,
        seedInputDataValidator: () => true,
      },
      seedDataExtractor: () => [],
      onProcessSeed: async () => {},
      transformers: {
        transformInput: data => data,
      },
    })

    expect(process).toBeInstanceOf(Function)
  })

  it("should throw an error if validate seed path function doesn't return true value", () => {
    const process = createSeedProcessor({
      validators: {
        seedPathValidator: () => false,
        seedOutputDataValidator: () => true,
        seedInputDataValidator: () => true,
      },
      seedDataExtractor: () => [],
      onProcessSeed: async () => {},
      transformers: {
        transformInput: data => data,
      },
    })

    expect(() => process(prisma)).toThrow("Invalid seed path")
  })

  it("should throw an error if validate seed input data return false", () => {
    const process = createSeedProcessor({
      validators: {
        seedPathValidator: () => true,
        seedOutputDataValidator: () => true,
        seedInputDataValidator: () => false,
      },
      seedDataExtractor: () => [],
      onProcessSeed: async () => {},
      transformers: {
        transformInput: data => data,
      },
    })

    expect(() => process(prisma)).toThrow("Invalid seed data")
  })

  it("should throw an error if validate seed output data return false", () => {
    const process = createSeedProcessor({
      validators: {
        seedPathValidator: () => true,
        seedOutputDataValidator: () => false,
        seedInputDataValidator: () => true,
      },
      seedDataExtractor: () => [],
      onProcessSeed: async () => {},
      transformers: {
        transformInput: data => data,
      },
    })

    expect(() => process(prisma)).toThrow("Invalid transformed seed data")
  })

  it("should call return value from onProcessSeed callback", () => {
    const processSeedResult = { count: 1 }
    const onProcessSeed = jest.fn().mockResolvedValueOnce(processSeedResult)
    const process = createSeedProcessor({
      validators: {
        seedPathValidator: () => true,
        seedOutputDataValidator: () => true,
        seedInputDataValidator: () => true,
      },
      seedDataExtractor: () => [],
      onProcessSeed: onProcessSeed,
      transformers: {
        transformInput: data => data,
      },
    })

    const promise = process(prisma)

    expect(onProcessSeed).toHaveBeenCalled()
    expect(promise).resolves.toEqual(processSeedResult)
  })
})
