import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { passportJwtSecret } from "jwks-rsa"
import { ExtractJwt, Strategy } from "passport-jwt"
import { EnvironmentConfig } from "../../config/env/env-configuration"
import { AwsCognitoUserDto } from "./dto/aws-cognito-user.dto"

@Injectable()
export class CognitoJwtStrategy extends PassportStrategy(Strategy, "cognito-jwt") {
  constructor(readonly configService: ConfigService) {
    const cognitoIssuer = configService.get<EnvironmentConfig["awsCognito"]>("awsCognito").issuer
    const cognitoJwksUri = cognitoIssuer + "/.well-known/jwks.json"

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: cognitoIssuer,
      algorithms: ["RS256"],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: cognitoJwksUri,
      }),
    })
  }

  async validate(payload: { sub: string; email: string }): Promise<AwsCognitoUserDto> {
    return { cognitoUserId: payload.sub, email: payload.email, username: payload.email }
  }
}
