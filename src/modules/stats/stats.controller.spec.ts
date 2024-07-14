import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { TotalStatsDto } from "./dto/total-stats.dto"
import { StatsController } from "./stats.controller"
import { StatsService } from "./stats.service"

describe("StatsController", () => {
  let controller: StatsController
  let statsService: StatsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [StatsController],
      providers: [StatsService, MockedLogger],
    }).compile()

    controller = module.get<StatsController>(StatsController)
    statsService = module.get<StatsService>(StatsService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  describe("Get total stats", () => {
    it("should return stats", async () => {
      const statsMock: TotalStatsDto = {
        totalCities: 1,
        totalGuides: 2,
        totalUsers: 3,
        totalCountries: 4,
      }
      jest.spyOn(statsService, "getTotalStats").mockReturnValueOnce(Promise.resolve(statsMock))

      const res = await controller.getTotalStats()

      expect(res).toEqual({
        data: statsMock,
        errors: null,
      })
    })

    it("should return object containing error", async () => {
      jest.spyOn(statsService, "getTotalStats").mockRejectedValueOnce(new Error("Unexpected error"))

      const res = await controller.getTotalStats()

      expect(res.data).toBeNull()
      expect(res.errors).toHaveLength(1)
    })
  })
})
