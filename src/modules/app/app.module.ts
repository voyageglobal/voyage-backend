import { CacheModule } from "@nestjs/cache-manager"
import { Logger, Module, ModuleMetadata } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "../auth/auth.module"
import { CitiesModule } from "../cities/cities.module"
import { CountriesModule } from "../countries/countries.module"
import { GuideCategoriesModule } from "../guide-categories/guide-categories.module"
import { GuidesModule } from "../guides/guides.module"
import { ImagesModule } from "../images/images.module"
import { UsersModule } from "../users/users.module"
import { StatsModule } from "../stats/stats.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { getEnvironmentConfig } from "../../config/env/env-configuration"
import { HealthCheckModule } from "../health-check/health-check.module"

type ModuleImports = ModuleMetadata["imports"]

const CONFIG_MODULES: ModuleImports = [
  ConfigModule.forRoot({
    load: [getEnvironmentConfig],
    expandVariables: true,
  }),
  CacheModule.register(),
]

const API_MODULES: ModuleImports = [
  GuidesModule,
  GuideCategoriesModule,
  ImagesModule,
  CountriesModule,
  CitiesModule,
  HealthCheckModule,
  AuthModule,
  UsersModule,
  StatsModule,
]

@Module({
  imports: [...CONFIG_MODULES, ...API_MODULES],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
