import { INestApplication, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import { ConfigService } from "@nestjs/config"
import * as cookieParser from "cookie-parser"
import { isProdEnv } from "./config/env/utils"
import { AppModule } from "./modules/app/app.module"
import { getLoggerInstance } from "./config/logger"
import { generateSwaggerConfig, SWAGGER_API_URL } from "./config/swagger-config"
import { EnvironmentConfig } from "./config/env/env-configuration"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggerInstance(),
  })

  const configService = app.get<ConfigService<EnvironmentConfig>>(ConfigService)
  const appPort = configService.get<EnvironmentConfig["app_port"]>("app_port")
  const appCors = configService.get<EnvironmentConfig["app_cors"]>("app_cors")

  app.enableCors({
    origin: appCors,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
  })

  setupSwagger(app)

  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  await app.listen(appPort, () => {
    console.log(`Server is running on ${appPort} port!`)
  })
}

function setupSwagger(app: INestApplication) {
  if (isProdEnv()) {
    return
  }

  const swaggerConfig = generateSwaggerConfig()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(SWAGGER_API_URL, app, swaggerDocument)
}

bootstrap()
