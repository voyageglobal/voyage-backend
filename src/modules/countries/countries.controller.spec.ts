import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { CountriesController } from "./countries.controller"
import { CountriesService } from "./countries.service"
import { CacheModule } from "@nestjs/cache-manager"

describe("CountriesController", () => {
  let controller: CountriesController
  let countriesService: CountriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CacheModule.register()],
      controllers: [CountriesController],
      providers: [CountriesService, MockedLogger],
    }).compile()

    controller = module.get<CountriesController>(CountriesController)
    countriesService = module.get<CountriesService>(CountriesService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
