import { PrismaClient } from "@prisma/client"

export type SeedPathValidator = (path?: string) => boolean

export type SeedDataValidator<TData> = (data: TData[]) => boolean

export type SeedDataExtractor<TData> = () => TData[]

export type SeedDataTransformer<TInputData, TOutputData> = (data: TInputData[]) => TOutputData[]

export type OnProcessSeed<TData, TResult> = (prisma: PrismaClient, data?: TData) => Promise<TResult>

export type CreateSeedProcessorParams<TInputData, TOutputData = TInputData> = {
  validators: {
    seedPathValidator: SeedPathValidator
    seedInputDataValidator: SeedDataValidator<TInputData>
    seedOutputDataValidator?: SeedDataValidator<TOutputData>
  }
  seedDataExtractor: SeedDataExtractor<TInputData>
  transformers?: {
    transformInput?: SeedDataTransformer<TInputData, TOutputData>
  }
  onProcessSeed: OnProcessSeed<TOutputData[], unknown>
}

export const DEFAULT_TRANSFORMER = <TIn, TOut = TIn>(data: TIn): TOut => data as unknown as TOut

export const DEFAULT_VALIDATOR = <T>(data: T[]): boolean => data.length > 0

export function createSeedProcessor<TDataIn, TDataOut = TDataIn>({
  validators: {
    seedPathValidator: validateSeedPath,
    seedInputDataValidator: validateSeedInputData,
    seedOutputDataValidator: validateSeedOutputData = DEFAULT_VALIDATOR,
  },
  transformers: { transformInput = DEFAULT_TRANSFORMER } = {},
  seedDataExtractor,
  onProcessSeed,
}: CreateSeedProcessorParams<TDataIn, TDataOut>) {
  return (prisma: PrismaClient) => {
    // Step 1: Validate seed path
    const isPathValid = validateSeedPath()

    if (!isPathValid) {
      throw new Error(`Invalid seed path`)
    }

    // Step 2: Extract seed data
    const seedData = seedDataExtractor()

    // Step 3: Validate seed data
    const isInputDataValid = validateSeedInputData(seedData)

    if (!isInputDataValid) {
      throw new Error("Invalid seed data")
    }

    // Step 4: Transform seed data
    const seedOutputData = transformInput(seedData)

    // Step 5: validate transformed seed data
    const isOutputDataValid = validateSeedOutputData(seedOutputData)

    if (!isOutputDataValid) {
      throw new Error("Invalid transformed seed data")
    }

    // Step 6: handle seed data in the database
    return onProcessSeed(prisma, seedOutputData)
  }
}
