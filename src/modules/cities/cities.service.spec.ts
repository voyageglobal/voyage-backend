import { Test, TestingModule } from "@nestjs/testing"
import { getCityDtoMock, getPrismaCityMock } from "../../test-utils/mocks/city"
import { PrismaClientMock, prismaMock } from "../../test-utils/prisma"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { PrismaService } from "../prisma/prisma.service"
import { CitiesService } from "./cities.service"
import { CitiesSortOrder } from "./dto/get-cities-query.dto"
import { CacheModule } from "@nestjs/cache-manager"

describe("CitiesService", () => {
  let service: CitiesService
  let prisma: PrismaClientMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CacheModule.register()],
      providers: [CitiesService, PrismaService, MockedLogger],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile()

    service = module.get<CitiesService>(CitiesService)
    prisma = prismaMock as unknown as PrismaClientMock
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  describe("findAll", () => {
    it("should return a list of cities", async () => {
      const cityDtoMock = getCityDtoMock()
      const prismaCityMock = getPrismaCityMock({ id: cityDtoMock.id, name: cityDtoMock.name })

      prisma.$transaction.mockResolvedValue([[prismaCityMock], 1])
      prisma.city.findMany.mockResolvedValue([prismaCityMock])
      prisma.city.count.mockResolvedValue(1)

      const citiesPage = await service.findAll({
        pageSize: 10,
        sortOrder: CitiesSortOrder.NAME_ASC,
        onlyWithGuides: false,
        page: 1,
      })

      expect(citiesPage.total).toEqual(1)
      expect(citiesPage.page).toEqual(1)
      expect(citiesPage.items).toHaveLength(1)
      expect(citiesPage.items[0].id).toEqual(cityDtoMock.id)
      expect(citiesPage.items[0].name).toEqual(cityDtoMock.name)
    })

    it("should return a list of cities containing search string", async () => {
      const cityDtoMock = getCityDtoMock({ name: "Search city" })
      const prismaCityMock = getPrismaCityMock({ id: cityDtoMock.id, name: cityDtoMock.name })

      prisma.$transaction.mockResolvedValue([[prismaCityMock], 1])
      prisma.city.findMany.mockResolvedValue([prismaCityMock])
      prisma.city.count.mockResolvedValue(1)

      const citiesPage = await service.findAll({
        pageSize: 10,
        sortOrder: CitiesSortOrder.NAME_ASC,
        onlyWithGuides: false,
        page: 1,
        searchString: "search",
      })

      expect(citiesPage.items).toHaveLength(1)
      expect(citiesPage.items[0].id).toEqual(cityDtoMock.id)
      expect(citiesPage.items[0].name).toEqual(cityDtoMock.name)
    })

    it("should return a list of cities with guides", async () => {
      const cityDtoMock = getCityDtoMock()
      const prismaCityMock = getPrismaCityMock({ id: cityDtoMock.id, name: cityDtoMock.name })

      prisma.$transaction.mockResolvedValue([[prismaCityMock], 1])
      prisma.city.findMany.mockResolvedValue([prismaCityMock])
      prisma.city.count.mockResolvedValue(1)

      const cities = await service.findAll({
        pageSize: 10,
        sortOrder: CitiesSortOrder.NAME_ASC,
        onlyWithGuides: true,
        page: 1,
      })

      expect(cities.items).toHaveLength(1)
      expect(cities.items[0].id).toEqual(cityDtoMock.id)
      expect(cities.items[0].name).toEqual(cityDtoMock.name)
    })

    it("should throw an error if prisma fails", async () => {
      prisma.$transaction.mockRejectedValue(new Error("Prisma error"))

      expect.assertions(1)
      try {
        await service.findAll({
          pageSize: 10,
          page: 1,
          onlyWithGuides: false,
          sortOrder: CitiesSortOrder.NAME_ASC,
        })
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe("findOne", () => {
    it("should return a city", async () => {
      const cityDtoMock = getCityDtoMock({ id: "1" })
      const prismaCityMock = getPrismaCityMock({ id: cityDtoMock.id, name: cityDtoMock.name })
      prisma.city.findUnique.mockResolvedValue(prismaCityMock)

      const city = await service.findOne(prismaCityMock.id)

      expect(city.id).toEqual(cityDtoMock.id)
      expect(city.name).toEqual(cityDtoMock.name)
    })

    it("should return null if city not found", async () => {
      prisma.city.findUnique.mockResolvedValue(null)

      const city = await service.findOne("1")

      expect(city).toBeNull()
    })

    it("should throw an error if prisma fails", async () => {
      prisma.city.findUnique.mockRejectedValue(new Error("Prisma error"))

      await expect(service.findOne("1")).rejects.toThrowError()
    })
  })
})
