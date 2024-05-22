import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js"
import { EnvironmentConfig } from "../../config/env/env-configuration"
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
    const { password, name, email } = signUpDto

    this.logger.log(`Signing up user with email: ${email}`)
    const requiredCognitoAttributes: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: "name",
        Value: name,
      }),
    ]

    const validationData: CognitoUserAttribute[] | null = null

    return new Promise((resolve, reject) => {
      this.cognitoUserPool.signUp(email, password, requiredCognitoAttributes, validationData, (error, result) => {
        if (error || !result) {
          this.logger.error("Error while signing up user", error)

          reject(error)
        } else {
          this.logger.log("User has been signed up")

          const cognitoUserDto: AwsCognitoUserDto = {
            username: result.user.getUsername(),
          }

          resolve(cognitoUserDto)
        }
      })
    })
  }
}
