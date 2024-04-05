import { CreateGuideDto } from "../../modules/guides/dto/create-guide.dto"
import { GuideDto } from "../../modules/guides/dto/guide.dto"
import { UpdateGuideDto } from "../../modules/guides/dto/update-guide.dto"
import { Guide } from "../../modules/guides/entities/guide.entity"

export function getGuideMock(overrides: Partial<Guide> = {}): Guide {
  return {
    id: "guide-1",
    name: "Test Guide",
    text: "This is a test guide",
    visitedDateStart: new Date("2021-01-01T00:00:00Z"),
    visitedDateEnd: new Date("2021-01-01T00:00:00Z"),
    categories: [],
    primaryImages: [],
    contentImages: [],
    cities: [],
    countries: [],
    updatedAt: new Date("2021-01-01T00:00:00Z"),
    createdAt: new Date("2021-01-01T00:00:00Z"),
    deleted: false,
    ...overrides,
  }
}

export function getGuideDtoMock(overrides: Partial<GuideDto> = {}): GuideDto {
  return {
    id: "guide-dto-1",
    name: "Test Guide",
    text: "This is a test guide",
    categories: [],
    primaryImages: [],
    contentImages: [],
    cities: [],
    countries: [],
    visitedDateStart: new Date("2021-01-01T00:00:00Z"),
    visitedDateEnd: new Date("2021-01-01T00:00:00Z"),
    ...overrides,
  }
}

export function getCreateGuideDtoMock(overrides: Partial<CreateGuideDto> = {}): CreateGuideDto {
  return {
    name: "Test Guide",
    text: "This is a test guide",
    categories: [],
    cities: [],
    countries: [],
    primaryImages: [],
    contentImages: [],
    visitedDateStart: new Date("2021-01-01T00:00:00Z"),
    visitedDateEnd: new Date("2021-01-01T00:00:00Z"),
    ...overrides,
  }
}

export function getUpdateGuideDtoMock(overrides: Partial<UpdateGuideDto> = {}): UpdateGuideDto {
  return {
    id: "guide-1",
    name: "Test Guide",
    text: "This is a test guide",
    categories: [],
    cities: [],
    countries: [],
    primaryImages: [],
    contentImages: [],
    visitedDateStart: new Date("2021-01-01T00:00:00Z"),
    visitedDateEnd: new Date("2021-01-01T00:00:00Z"),
    ...overrides,
  }
}
