import { Injectable, Logger } from "@nestjs/common"
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
    try {
      this.logger.log("Signing in user")
      const { username, accessToken, refreshToken } = await this.awsCognitoService.signIn(loginUserDto)

      return { username: username, accessToken: accessToken, refreshToken: refreshToken }
    } catch (error) {
      this.logger.error("Error while signing in user", error)

      throw error
    }
  }

  async signUp(singupUserDto: AuthRegisterUserDto) {
    try {
      this.logger.log("Signing up user")
      const { username } = await this.awsCognitoService.signUp(singupUserDto)

      return { username: username }
    } catch (error) {
      this.logger.error("Error while signing up user", error)

      throw error
    }
  }
}
