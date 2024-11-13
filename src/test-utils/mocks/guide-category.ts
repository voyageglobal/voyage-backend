import { GuideCategoryDto } from "../../modules/guide-categories/dto/guide-category.dto"
import { GuideCategory } from "../../modules/guide-categories/entities/guide-category.entity"

export function getGuideCategoryMock(overrides: Partial<GuideCategory> = {}): GuideCategory {
  return {
    key: "nature",
    name: "Nature",
    imageUrl: "https://example.com/explore-city.png",
    iconName: "nature",
    guides: [],
    deleted: false,
    createdAt: new Date("2021-01-01T00:00:00Z"),
    updatedAt: new Date("2021-01-01T00:00:00Z"),
    ...overrides,
  }
}

export function getGuideCategoryDtoMock(overrides: Partial<GuideCategoryDto> = {}): GuideCategoryDto {
  return {
    key: "nature",
    name: "Nature",
    iconName: "nature",
    imageUrl: "https://example.com/explore-city.png",
    ...overrides,
  }
}
