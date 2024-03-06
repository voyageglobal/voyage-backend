import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { S3Client, PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3"
import { EnvironmentConfig } from "../../config/env/env-configuration"

@Injectable()
export class AwsS3Service {
  private readonly s3Client = new S3Client({
    region: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").region,
    credentials: {
      accessKeyId: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").accessKeyId,
      secretAccessKey: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").secretAccessKey,
    },
  })

  constructor(private readonly configService: ConfigService) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<unknown> {
    const fileUploadPromises = files.map(file => {
      return this.uploadFileToS3(file)
    })

    try {
      const results = await Promise.allSettled(fileUploadPromises)

      // TODO: return something meaningful
      return null
    } catch (error) {
      console.error(error)

      return null
    }
  }

  private ImageUploadCommand(fileName: string, fileBody: Buffer, mimetype: string) {
    return new PutObjectCommand({
      Bucket: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").bucketName,
      Key: fileName,
      Body: fileBody,
      ContentType: mimetype,
      // NOTE: Not sure about correct value
      ContentDisposition: `inline; filename=${fileName}`,
    })
  }

  private async uploadFileToS3(file: Express.Multer.File): Promise<PutObjectCommandOutput> {
    try {
      const imageUploadCommand = this.ImageUploadCommand(file.originalname, file.buffer, file.mimetype)

      const response = await this.s3Client.send(imageUploadCommand)

      return response
    } catch (error) {
      // TODO: handle error correctly
      // TODO: log error
      console.error(error)

      return null
    }
  }
}
