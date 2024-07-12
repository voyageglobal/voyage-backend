import * as process from "process"

export const DEFAULT_APP_PORT = 4000

export type EnvironmentConfig = {
  app_port: number
  app_cors: string
  db: {
    host: string
    port: number
    name: string
    username: string
    password: string
    url: string
  }
  awsS3: {
    accessKeyId: string
    secretAccessKey: string
    region: string
    bucketName: string
  }
  awsCognito: {
    userPoolId: string
    clientId: string
    audience: string
    issuer: string
  }
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const config: EnvironmentConfig = {
    app_port: parseInt(process.env.APP_PORT, 10) || DEFAULT_APP_PORT,
    app_cors: process.env.APP_CORS,
    db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT_OUT, 10),
      name: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      url: process.env.DB_URL,
    },
    awsS3: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION,
      bucketName: process.env.AWS_S3_BUCKET,
    },
    awsCognito: {
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      clientId: process.env.AWS_COGNITO_CLIENT_ID,
      audience: process.env.AWS_COGNITO_AUDIENCE,
      issuer: process.env.AWS_COGNITO_ISSUER,
    },
  }

  return config
}
