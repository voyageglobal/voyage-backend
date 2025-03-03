import { NotFoundException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { getCityDtoMock } from "../../test-utils/mocks/city"
import { MockedLogger } from "../../test-utils/providers"
import { PageDto } from "../common/types"
import { PrismaModule } from "../prisma/prisma.module"
import { CitiesController } from "./cities.controller"
import { CitiesService } from "./cities.service"
import { CityDto } from "./dto/city.dto"
import { CitiesSortOrder } from "./dto/get-cities-query.dto"
import { GetCityResponseDto } from "./dto/get-city-response.dto"
import { CacheModule } from "@nestjs/cache-manager"

describe("CitiesController", () => {
  let controller: CitiesController
  let citiesService: CitiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CacheModule.register()],
      controllers: [CitiesController],
      providers: [CitiesService, MockedLogger],
    }).compile()

    controller = module.get<CitiesController>(CitiesController)
    citiesService = module.get<CitiesService>(CitiesService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  describe("Get city by id", () => {
    it("should return city by id", async () => {
      const cityMock = getCityDtoMock({
        id: "1",
      })
      const expectedResult: GetCityResponseDto = {
        data: cityMock,
        errors: null,
      }
      jest.spyOn(citiesService, "findOne").mockReturnValueOnce(Promise.resolve(cityMock))

      const result = await controller.findOne("1")

      expect(result).toEqual(expectedResult)
    })

    it("should throw error when city wasn't found", async () => {
      jest.spyOn(citiesService, "findOne").mockReturnValueOnce(Promise.resolve(null))

      expect.assertions(1)
      try {
        await controller.findOne("1")
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })

    it("should return object containing error", async () => {
      jest.spyOn(citiesService, "findOne").mockRejectedValueOnce(new Error("Unexpected error"))

      const result = await controller.findOne("1")

      expect(result.data).toBeNull()
      expect(result.errors).toHaveLength(1)
    })
  })

  describe("Get cities", () => {
    it("should return cities", async () => {
      const citiesPage: PageDto<CityDto> = {
        items: [getCityDtoMock()],
        hasMore: false,
        page: 1,
        pageSize: 10,
        total: 1,
      }
      jest.spyOn(citiesService, "findAll").mockReturnValueOnce(Promise.resolve(citiesPage))

      const result = await controller.findAll({
        page: 1,
        onlyWithGuides: false,
        pageSize: 10,
        sortOrder: CitiesSortOrder.NAME_ASC,
      })

      expect(result.data.page).toEqual(1)
      expect(result.data.pageSize).toEqual(10)
      expect(result.data.total).toEqual(1)
      expect(result.data.items).toHaveLength(1)
      expect(result.data.items).toContainEqual(citiesPage.items[0])
    })

    it("should return object containing error", async () => {
      jest.spyOn(citiesService, "findAll").mockRejectedValueOnce(new Error("Unexpected error"))

      const result = await controller.findAll({
        page: 1,
        sortOrder: CitiesSortOrder.NAME_ASC,
        onlyWithGuides: false,
        pageSize: 10,
      })

      expect(result.data).toBeNull()
      expect(result.errors).toHaveLength(1)
    })
  })
})
