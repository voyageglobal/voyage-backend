import { createSeedProcessor } from "./seed-processor"

describe("Seed processor", () => {
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
})
