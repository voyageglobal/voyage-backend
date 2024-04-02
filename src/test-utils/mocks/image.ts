import { ImageDto } from "../../modules/images/dto/image.dto"
import { Image } from "../../modules/images/entities/image.entity"

export function getImageMock(overrides: Partial<Image> = {}): Image {
  return {
    id: "image-1",
    url: "https://example.com/image.jpg",
    type: "jpg",
    alt: "Test Image",
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

export function getImageDtoMock(overrides: Partial<ImageDto> = {}): ImageDto {
  return {
    id: "image-dto-1",
    url: "https://example.com/image.jpg",
    type: "jpg",
    ...overrides,
  }
}
