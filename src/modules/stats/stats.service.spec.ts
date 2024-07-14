import { Test, TestingModule } from "@nestjs/testing"
import { PrismaClientMock, prismaMock } from "../../test-utils/prisma"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { PrismaService } from "../prisma/prisma.service"
import { StatsService } from "./stats.service"

describe("StatsService", () => {
  let service: StatsService
  let prisma: PrismaClientMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [StatsService, PrismaService, MockedLogger],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile()

    service = module.get<StatsService>(StatsService)
    prisma = prismaMock as unknown as PrismaClientMock
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  describe("Get total stats", () => {
    it("should return total stats", async () => {
      prisma.$transaction.mockResolvedValue([10, 5, 20])

      const totalStats = await service.getTotalStats()

      expect(totalStats.totalCities).toEqual(10)
      expect(totalStats.totalCountries).toEqual(5)
      expect(totalStats.totalGuides).toEqual(20)
    })

    it("should throw an error if something goes wrong", async () => {
      prisma.$transaction.mockRejectedValue(new Error("Test error"))

      await expect(service.getTotalStats()).rejects.toThrow("Failed to get total stats")
    })
  })
})
