import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js"
import { EnvironmentConfig } from "../../config/env/env-configuration"
import { AwsCognitoSignInResultDto } from "./dto/aws-cognito-sign-in-result.dto"
import { AwsCognitoSignInDto } from "./dto/aws-cognito-sign-in.dto"
import { AwsCognitoSignUpConfirmDto } from "./dto/aws-cognito-sign-up-confirm.dto"
import { AwsCognitoSignUpDto } from "./dto/aws-cognito-sign-up.dto"
import { AwsCognitoUserDto } from "./dto/aws-cognito-user.dto"

@Injectable()
export class AwsCognitoService {
  private readonly cognitoUserPool: CognitoUserPool = new CognitoUserPool({
    UserPoolId: this.configService.get<EnvironmentConfig["awsCognito"]>("awsCognito").userPoolId,
    ClientId: this.configService.get<EnvironmentConfig["awsCognito"]>("awsCognito").clientId,
  })

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async signUp(signUpDto: AwsCognitoSignUpDto): Promise<AwsCognitoUserDto> {
    const { password, username, email } = signUpDto

    this.logger.log(`Signing up user with email: ${email}`)
    const requiredCognitoAttributes: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: "name",
        Value: username,
      }),
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ]

    const validationData: CognitoUserAttribute[] | null = null

    return new Promise((resolve, reject) => {
      this.cognitoUserPool.signUp(username, password, requiredCognitoAttributes, validationData, (error, result) => {
        if (error || !result) {
          this.logger.error("Error while signing up user", error)

          reject(error)
        } else {
          this.logger.log("User has been signed up")

          const cognitoUserDto: AwsCognitoUserDto = {
            username: result.user.getUsername(),
            email: email,
            cognitoUserId: result.userSub,
          }

          resolve(cognitoUserDto)
        }
      })
    })
  }

  async signUpConfirm(signUpConfirmDto: AwsCognitoSignUpConfirmDto): Promise<boolean> {
    const { username, confirmationCode } = signUpConfirmDto

    this.logger.log("Confirming sign up")
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.cognitoUserPool,
    })

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, error => {
        if (error) {
          this.logger.error("Error while confirming sign up", error)

          reject(error)
        } else {
          this.logger.log("User has been confirmed")

          resolve(true)
        }
      })
    })
  }

  async resendConfirmationCode(username: string): Promise<boolean> {
    this.logger.log("Resending confirmation code")
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.cognitoUserPool,
    })

    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode(error => {
        if (error) {
          this.logger.error("Error while resending confirmation code", error)

          reject(error)
        } else {
          this.logger.log("Confirmation code has been resent")

          resolve(true)
        }
      })
    })
  }

  async signIn(signInDto: AwsCognitoSignInDto): Promise<AwsCognitoSignInResultDto> {
    const { password, username } = signInDto

    this.logger.log(`Signing in user with email: ${username}`)
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    })

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.cognitoUserPool,
    })

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          this.logger.log("User has been signed in")

          const signInResult: AwsCognitoSignInResultDto = {
            username: username,
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          }

          resolve(signInResult)
        },
        onFailure: error => {
          this.logger.error("Error while signing in user", error)

          reject(error)
        },
      })
    })
  }
}
