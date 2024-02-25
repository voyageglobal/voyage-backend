import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigModule } from "@nestjs/config"
import { loadEnvConfig } from "./config/env-configuration"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadEnvConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
