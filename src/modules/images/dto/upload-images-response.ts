import { ApiProperty } from "@nestjs/swagger"
import { ApiResponse } from "../../common/types"
import { ImageDto } from "./image.dto"

export class UploadImagesResponse implements ApiResponse<ImageDto[]> {
  @ApiProperty({
    type: [ImageDto],
    description: "The uploaded images",
    example: [
      {
        key: "image1.jpg",
        url: "https://example.com/image1.jpg",
        error: null,
      },
    ],
    required: true,
  })
  data: ImageDto[]

  @ApiProperty({
    type: [Error],
    description: "The errors",
    example: [
      {
        message: "The file is too large",
      },
    ],
    required: false,
  })
  errors: Error[] | null
}
