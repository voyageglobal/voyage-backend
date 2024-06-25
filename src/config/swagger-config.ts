import { DocumentBuilder } from "@nestjs/swagger"

export const SWAGGER_API_URL = "api/docs"

export function generateSwaggerConfig() {
  const config = new DocumentBuilder()
    .setTitle("Voyage API")
    .setDescription("The Voyage API description")
    .setVersion("1.0")
    .addTag("voyage")
    .addBearerAuth()
    .build()

  return config
}
