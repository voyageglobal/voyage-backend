import { Test, TestingModule } from "@nestjs/testing"
import { MockedConfigService, MockedLogger } from "../../test-utils/providers"
import { AwsCognitoService } from "./aws-cognito.service"

jest.mock("amazon-cognito-identity-js", () => {
  return {
    ...jest.requireActual("amazon-cognito-identity-js"),
    CognitoUserPool: jest.fn().mockImplementation(() => {
      return {
        signUp: jest.fn(),
      }
    }),
  }
})

describe("AwsCognitoService", () => {
  let service: AwsCognitoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsCognitoService, MockedConfigService, MockedLogger],
    }).compile()

    service = module.get<AwsCognitoService>(AwsCognitoService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
