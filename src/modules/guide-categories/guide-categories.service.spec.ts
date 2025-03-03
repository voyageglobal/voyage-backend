import { Test, TestingModule } from "@nestjs/testing"
import { getGuideCategoryDtoMock, getGuideCategoryMock } from "../../test-utils/mocks/guide-category"
import { prismaMock, PrismaClientMock } from "../../test-utils/prisma"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaService } from "../prisma/prisma.service"
import { GuideCategoriesService } from "./guide-categories.service"
import { CacheModule } from "@nestjs/cache-manager"
import { PrismaModule } from "../prisma/prisma.module"

describe("GuideCategoriesService", () => {
  let service: GuideCategoriesService
  let prisma: PrismaClientMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CacheModule.register()],
      providers: [GuideCategoriesService, PrismaService, MockedLogger],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile()

    service = module.get<GuideCategoriesService>(GuideCategoriesService)
    prisma = prismaMock
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  describe("Get guide categories", () => {
    it("should return an empty array of guide categories", async () => {
      prisma.guideCategory.findMany.mockResolvedValueOnce([])

      const guideCategories = await service.findAll()

      expect(guideCategories).toEqual([])
    })

    it("should throw an error", async () => {
      const error = new Error("Test error")
      prisma.guideCategory.findMany.mockRejectedValueOnce(error)

      try {
        await service.findAll()
      } catch (error) {
        expect(error).toEqual(error)
      }
    })

    it("should return an array containing 1 guide category", async () => {
      const guideCategoryMock = getGuideCategoryMock({ key: "nature", guides: undefined })
      const guideCategoryDtoMock = getGuideCategoryDtoMock({ key: "nature" })
      prisma.guideCategory.findMany.mockResolvedValueOnce([guideCategoryMock])

      const guideCategories = await service.findAll()

      expect(guideCategories).toEqual([guideCategoryDtoMock])
    })
  })
})
