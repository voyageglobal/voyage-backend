import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { CountriesService } from "./countries.service"
import { CacheModule } from "@nestjs/cache-manager"

describe("CountriesService", () => {
  let service: CountriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CacheModule.register()],
      providers: [CountriesService, MockedLogger],
    }).compile()

    service = module.get<CountriesService>(CountriesService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
