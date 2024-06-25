import { Logger, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PassportModule } from "@nestjs/passport"
import { AwsCognitoService } from "./aws-cognito.service"
import { CognitoJwtStrategy } from "./jwt.strategy"

const passportModule = PassportModule.register({ defaultStrategy: "cognito-jwt" })

@Module({
  imports: [ConfigModule, passportModule],
  providers: [AwsCognitoService, Logger, CognitoJwtStrategy],
  exports: [AwsCognitoService, passportModule, CognitoJwtStrategy],
})
export class AwsCognitoModule {}
