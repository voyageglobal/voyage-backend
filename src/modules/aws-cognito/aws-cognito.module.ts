import { Logger, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AwsCognitoService } from "./aws-cognito.service"

@Module({
  imports: [ConfigModule],
  providers: [AwsCognitoService, Logger],
  exports: [AwsCognitoService],
})
export class AwsCognitoModule {}
