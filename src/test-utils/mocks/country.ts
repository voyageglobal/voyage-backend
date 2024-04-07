import { CountryDto } from "../../modules/countries/dto/country.dto"
import { Country } from "../../modules/countries/entities/country.entity"
import { getCityMock } from "./city"
import { getImageMock } from "./image"

export function getCountryMock(overrides: Partial<Country> = {}): Country {
  return {
    id: "country-1",
    name: "France",
    description: "A country in Europe",
    flag: "🇫🇷",
    cities: [getCityMock()],
    images: [getImageMock()],
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

export function getCountryDtoMock(overrides: Partial<CountryDto> = {}): CountryDto {
  return {
    id: "country-dto-1",
    name: "France",
    flag: "🇫🇷",
    description: "A country in Europe",
    images: [getImageMock()],
    cities: [getCityMock()],
    ...overrides,
  }
}
