import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger"
import { UploadImagesDto } from "./dto/upload-images.dto"
import { ImagesService } from "./images.service"

@ApiTags("images")
@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiOperation({
    summary: "Upload images",
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 201,
    description: "The images have been successfully uploaded.",
  })
  @ApiResponse({
    status: 400,
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
  async uploadImages(@UploadedFile() file: Express.Multer.File) {
    const uploadImagesDto: UploadImagesDto = {
      files: [file],
    }

    return this.imagesService.upload(uploadImagesDto)
  }
}
