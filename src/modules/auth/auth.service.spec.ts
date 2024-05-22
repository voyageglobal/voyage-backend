import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { AwsCognitoService } from "../aws-cognito/aws-cognito.service"
import { AuthService } from "./auth.service"

describe("AuthService", () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, MockedLogger],
    })
      .useMocker(token => {
        if (token === AwsCognitoService) {
          return {
            signUp: jest.fn(),
          }
        }
      })
      .compile()

    service = module.get<AuthService>(AuthService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
