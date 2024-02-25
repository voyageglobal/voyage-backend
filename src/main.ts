import { NestFactory } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import { ConfigService } from "@nestjs/config"
import * as cookieParser from "cookie-parser"
import { AppModule } from "./app.module"
import { getLoggerInstance } from "./config/logger"
import { generateSwaggerConfig, SWAGGER_API_URL } from "./config/swagger-config"
import { EnvVariables } from "./config/env-configuration"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggerInstance(),
  })

  const configService = app.get<ConfigService<EnvVariables>>(ConfigService)
  const appPort = configService.get<number>("app_port")

  const swaggerConfig = generateSwaggerConfig()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(SWAGGER_API_URL, app, swaggerDocument)

  app.use(cookieParser())

  await app.listen(appPort)
}

bootstrap()
