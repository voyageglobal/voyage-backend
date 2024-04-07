import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaService } from "./prisma.service"

describe("PrismaService", () => {
  let service: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, MockedLogger],
    }).compile()

    service = module.get<PrismaService>(PrismaService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  it("should call connect to db by triggering onModuleInit hook", async () => {
    const connectSpy = jest.spyOn(service, "$connect").mockImplementation(() => Promise.resolve())
    await service.onModuleInit()
    expect(connectSpy).toBeCalledTimes(1)
  })
})
