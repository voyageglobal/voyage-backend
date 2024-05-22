import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { AwsCognitoService } from "../aws-cognito/aws-cognito.service"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

describe("AuthController", () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
