import { Injectable, Logger, NotImplementedException } from "@nestjs/common"
import { AwsCognitoService } from "../aws-cognito/aws-cognito.service"
import { AuthLoginUserDto } from "./dto/auth-login-user.dto"
import { AuthRegisterUserDto } from "./dto/auth-register-user.dto"

@Injectable()
export class AuthService {
  constructor(
    private readonly awsCognitoService: AwsCognitoService,
    private readonly logger: Logger,
  ) {}

  async signIn(loginUserDto: AuthLoginUserDto) {
    throw new NotImplementedException()
  }

  async signUp(singupUserDto: AuthRegisterUserDto) {
    try {
      this.logger.log("Signing up user")
      const result = await this.awsCognitoService.signUp(singupUserDto)

      return result
    } catch (error) {
      this.logger.error("Error while signing up user", error)

      throw error
    }
  }
}
