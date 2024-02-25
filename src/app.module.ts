import { CacheModule } from "@nestjs/cache-manager"
import { Logger, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { loadEnvConfig } from "./config/env-configuration"
import { HealthCheckModule } from "./health-check/health-check.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadEnvConfig],
    }),
    HealthCheckModule,
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
