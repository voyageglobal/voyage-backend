import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { passportJwtSecret } from "jwks-rsa"
import { ExtractJwt, Strategy } from "passport-jwt"
import { EnvironmentConfig } from "../../config/env/env-configuration"

@Injectable()
export class CognitoJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const cognitoIssuer = configService.get<EnvironmentConfig["awsCognito"]>("awsCognito").issuer
    const cognitoAudience = configService.get<EnvironmentConfig["awsCognito"]>("awsCognito").audience
    const cognitoJwksUri = cognitoIssuer + "/.well-known/jwks.json"

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: cognitoAudience,
      issuer: cognitoIssuer,
      algorithms: ["RS256"],
      secretOrKey: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: cognitoJwksUri,
      }),
    })
  }

  async validate(payload: { sub: string; email: string }) {
    return { idUser: payload.sub, email: payload.email }
  }
}
