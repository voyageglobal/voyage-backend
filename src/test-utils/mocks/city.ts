import { CityDto } from "../../modules/cities/dto/city.dto"
import { City } from "../../modules/cities/entities/city.entity"
import { getImageMock } from "./image"
import { City as PrismaCity } from "@prisma/client"

export function getCityMock(overrides: Partial<City> = {}): City {
  return {
    id: "city-1",
    name: "Paris",
    description: "The capital of France",
    country: {
      id: "country-1",
      name: "France",
      description: "A country in Europe",
      flag: "🇫🇷",
      cities: [],
      images: [],
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    images: [getImageMock()],
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

export function getCityDtoMock(overrides: Partial<CityDto> = {}): CityDto {
  return {
    id: "city-dto-1",
    name: "Paris",
    description: "The capital of France",
    country: {
      id: "country-1",
      name: "France",
      flag: "🇫🇷",
      description: "A country in Europe",
      cities: [],
      images: [],
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    images: [getImageMock()],
    ...overrides,
  }
}

export function getPrismaCityMock(overrides: Partial<PrismaCity> = {}): PrismaCity {
  return {
    id: "city-1",
    name: "Paris",
    description: "The capital of France",
    countryId: "country-1",
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}
