import { Test, TestingModule } from "@nestjs/testing"
import { GuideCategoriesService } from "./guide-categories.service"

describe("GuideCategoriesService", () => {
  let service: GuideCategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuideCategoriesService],
    }).compile()

    service = module.get<GuideCategoriesService>(GuideCategoriesService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
