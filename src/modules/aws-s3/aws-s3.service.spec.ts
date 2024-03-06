import { ConfigModule, ConfigService } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { AwsS3Service } from "./aws-s3.service"

describe("AwsS3Service", () => {
  let service: AwsS3Service
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AwsS3Service,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => ({
              region: "region",
              accessKeyId: "accessKeyId",
              secretAccessKey: "secretAccessKey",
            })),
          },
        },
      ],
    }).compile()

    service = module.get<AwsS3Service>(AwsS3Service)
    configService = module.get<ConfigService>(ConfigService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
