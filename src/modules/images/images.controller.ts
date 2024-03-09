import { Controller, Logger, Post, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger"
import { UploadImagesResponseDto } from "./dto/upload-images-response.dto"
import { UploadImagesDto } from "./dto/upload-images.dto"
import { ImagesService } from "./images.service"

@ApiTags("images")
@Controller("images")
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Upload images",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiCreatedResponse({
    description: "The images have been successfully uploaded.",
    type: UploadImagesResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiResponse({
    status: 500,
    description: "Internal",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "List of images to upload",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  async uploadImages(@UploadedFile() file: Express.Multer.File): Promise<UploadImagesResponseDto> {
    const uploadImagesDto: UploadImagesDto = {
      files: [file],
    }

    const result = await this.imagesService.upload(uploadImagesDto)

    return {
      data: result,
      errors: null,
    }
  }
}
