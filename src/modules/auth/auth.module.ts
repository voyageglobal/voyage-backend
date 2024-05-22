import { Logger, Module } from "@nestjs/common"
import { AwsCognitoModule } from "../aws-cognito/aws-cognito.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
  imports: [AwsCognitoModule],
  controllers: [AuthController],
  providers: [AuthService, Logger],
})
export class AuthModule {}
