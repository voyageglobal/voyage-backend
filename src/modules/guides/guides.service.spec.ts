import { Test, TestingModule } from "@nestjs/testing"
import { getCityMock } from "../../test-utils/mocks/city"
import { getCountryMock } from "../../test-utils/mocks/country"
import { getGuideCategoryMock } from "../../test-utils/mocks/guide-category"
import {
  getCreateGuideDtoMock,
  getGuideDtoMock,
  getGuideMock,
  getUpdateGuideDtoMock,
} from "../../test-utils/mocks/guide"
import { getImageMock } from "../../test-utils/mocks/image"
import { PrismaClientMock, prismaMock } from "../../test-utils/prisma"
import { MockedLogger } from "../../test-utils/providers"
import { PaginationQuery } from "../common/types"
import { PrismaModule } from "../prisma/prisma.module"
import { PrismaService } from "../prisma/prisma.service"
import { GuidesService } from "./guides.service"

describe("GuidesService", () => {
  let service: GuidesService
  let prisma: PrismaClientMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GuidesService, PrismaService, MockedLogger],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile()

    service = module.get<GuidesService>(GuidesService)
    prisma = prismaMock
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  describe("Create guide", () => {
    it("should create a guide", async () => {
      const guide = getGuideMock({
        id: "new-guide-id",
        name: "New guide 1",
      })
      const createGuideDto = getCreateGuideDtoMock({
        name: guide.name,
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: createGuideDto.name,
      })
      prisma.guide.create.mockResolvedValueOnce(guide)

      const createdGuideDto = await service.create(createGuideDto)

      expect(createdGuideDto.name).toEqual(expectedGuideDto.name)
    })

    it("should create a guide containing categories ids", async () => {
      const guideCategories = [
        getGuideCategoryMock({ key: "category-key-1" }),
        getGuideCategoryMock({ key: "category-key-2" }),
      ]
      const guide = getGuideMock({
        id: "new-guide-id",
        name: "New guide 1",
        categories: guideCategories,
      })
      const createGuideDto = getCreateGuideDtoMock({
        name: guide.name,
        categories: guideCategories.map(category => category.key),
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: createGuideDto.name,
        categories: createGuideDto.categories.map(categoryKey => {
          return getGuideCategoryMock({ key: categoryKey })
        }),
      })
      prisma.guide.create.mockResolvedValueOnce(guide)

      const createdGuideDto = await service.create(createGuideDto)
      expect(createdGuideDto.id).toEqual(expectedGuideDto.id)
      expect(createdGuideDto.categories).toEqual(expectedGuideDto.categories)
    })

    it("should create a guide containing visited date fields", async () => {
      const startDate = new Date("2021-01-01")
      const endDate = new Date("2021-01-02")
      const guideName = "New guide 1"
      const guide = getGuideMock({
        id: "new-guide-id",
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: endDate,
      })
      const createGuideDto = getCreateGuideDtoMock({
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: endDate,
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: guideName,
        visitedDateStart: createGuideDto.visitedDateStart,
        visitedDateEnd: createGuideDto.visitedDateEnd,
      })
      prisma.guide.create.mockResolvedValueOnce(guide)

      const createdGuideDto = await service.create(createGuideDto)
      expect(prisma.guide.create.mock.calls[0][0].data.visitedDateStart.toString()).toEqual(startDate.toString())
      expect(prisma.guide.create.mock.calls[0][0].data.visitedDateEnd.toString()).toEqual(endDate.toString())
      expect(createdGuideDto).toEqual(expectedGuideDto)
      expect(createdGuideDto.visitedDateStart.toDateString()).toEqual(expectedGuideDto.visitedDateStart.toDateString())
      expect(createdGuideDto.visitedDateEnd.toDateString()).toEqual(expectedGuideDto.visitedDateEnd.toDateString())
    })

    it("should create guide containing visited date fields equal to now if they weren't provided", async () => {
      const fakeNowDate = new Date("2021-01-01")
      jest.useFakeTimers({
        now: fakeNowDate,
      })
      jest.setSystemTime(fakeNowDate)
      const guideName = "New guide 1"
      const guide = getGuideMock({
        id: "new-guide-id",
        name: guideName,
        visitedDateStart: fakeNowDate,
        visitedDateEnd: fakeNowDate,
      })
      const createGuideDto = getCreateGuideDtoMock({
        name: guideName,
        visitedDateStart: undefined,
        visitedDateEnd: undefined,
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: guideName,
        visitedDateStart: fakeNowDate,
        visitedDateEnd: fakeNowDate,
      })
      prisma.guide.create.mockResolvedValueOnce(guide)

      const createdGuideDto = await service.create(createGuideDto)
      expect(prisma.guide.create.mock.calls[0][0].data.visitedDateStart.toString()).toEqual(fakeNowDate.toString())
      expect(prisma.guide.create.mock.calls[0][0].data.visitedDateEnd.toString()).toEqual(fakeNowDate.toString())
      expect(createdGuideDto).toEqual(expectedGuideDto)
      expect(createdGuideDto.visitedDateStart.toDateString()).toEqual(expectedGuideDto.visitedDateStart.toDateString())
      expect(createdGuideDto.visitedDateEnd.toDateString()).toEqual(expectedGuideDto.visitedDateEnd.toDateString())
      jest.useRealTimers()
    })

    it("should create guide containing visited date end same as start if end date wasn't provided", async () => {
      const startDate = new Date("2021-01-01")
      const guideName = "New guide 1"
      const guide = getGuideMock({
        id: "new-guide-id",
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: startDate,
      })
      const createGuideDto = getCreateGuideDtoMock({
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: undefined,
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: startDate,
      })
      prisma.guide.create.mockResolvedValueOnce(guide)

      const createdGuideDto = await service.create(createGuideDto)

      expect(prisma.guide.create.mock.calls[0][0].data.visitedDateEnd.toString()).toEqual(startDate.toString())
      expect(createdGuideDto).toEqual(expectedGuideDto)
      expect(createdGuideDto.visitedDateStart.toDateString()).toEqual(expectedGuideDto.visitedDateStart.toDateString())
      expect(createdGuideDto.visitedDateEnd.toDateString()).toEqual(expectedGuideDto.visitedDateEnd.toDateString())
    })

    it("should throw an error", async () => {
      const createGuideDtoMock = getCreateGuideDtoMock()
      const error = new Error("Test error")
      prisma.guide.create.mockRejectedValueOnce(error)

      try {
        await service.create(createGuideDtoMock)
      } catch (error) {
        expect(error).toEqual(error)
      }
    })
  })

  describe("Update guide", () => {
    it("should update a guide", async () => {
      const guide = getGuideMock({
        id: "new-guide-id",
        name: "New guide 1",
      })
      const updateGuideDto = getUpdateGuideDtoMock({
        id: guide.id,
        name: guide.name,
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: updateGuideDto.name,
      })
      prisma.guide.update.mockResolvedValueOnce(guide)

      const updatedGuideDto = await service.update(updateGuideDto.id, updateGuideDto)

      expect(updatedGuideDto.name).toEqual(expectedGuideDto.name)
    })

    it("should update a guide containing categories ids", async () => {
      const guideCategories = [
        getGuideCategoryMock({ key: "category-key-1" }),
        getGuideCategoryMock({ key: "category-key-2" }),
      ]
      const guide = getGuideMock({
        id: "new-guide-id",
        name: "New guide 1",
        categories: guideCategories,
      })
      const updateGuideDto = getUpdateGuideDtoMock({
        id: guide.id,
        name: guide.name,
        categories: guideCategories.map(category => category.key),
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: updateGuideDto.name,
        categories: updateGuideDto.categories.map(categoryKey => {
          return getGuideCategoryMock({ key: categoryKey })
        }),
      })
      prisma.guide.update.mockResolvedValueOnce(guide)

      const updatedGuideDto = await service.update(updateGuideDto.id, updateGuideDto)

      expect(updatedGuideDto.id).toEqual(expectedGuideDto.id)
      expect(updatedGuideDto.categories).toEqual(expectedGuideDto.categories)
    })

    it("should update guide containing visited date fields", async () => {
      const startDate = new Date("2021-01-01")
      const endDate = new Date("2021-01-02")
      const guideName = "New guide 1"
      const guide = getGuideMock({
        id: "new-guide-id",
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: endDate,
      })
      const updateGuideDto = getUpdateGuideDtoMock({
        id: guide.id,
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: endDate,
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: guideName,
        visitedDateStart: updateGuideDto.visitedDateStart,
        visitedDateEnd: updateGuideDto.visitedDateEnd,
      })
      prisma.guide.update.mockResolvedValueOnce(guide)

      const updatedGuideDto = await service.update(updateGuideDto.id, updateGuideDto)

      expect(prisma.guide.update.mock.calls[0][0].data.visitedDateStart.toString()).toEqual(startDate.toString())
      expect(prisma.guide.update.mock.calls[0][0].data.visitedDateEnd.toString()).toEqual(endDate.toString())
      expect(updatedGuideDto).toEqual(expectedGuideDto)
      expect(updatedGuideDto.visitedDateStart.toDateString()).toEqual(expectedGuideDto.visitedDateStart.toDateString())
      expect(updatedGuideDto.visitedDateEnd.toDateString()).toEqual(expectedGuideDto.visitedDateEnd.toDateString())
    })

    it("should update guide containing visited date fields equal to now if they weren't provided", async () => {
      const fakeNowDate = new Date("2021-01-01")
      jest.useFakeTimers({
        now: fakeNowDate,
      })
      jest.setSystemTime(fakeNowDate)
      const guideName = "New guide 1"
      const guide = getGuideMock({
        id: "new-guide-id",
        name: guideName,
        visitedDateStart: fakeNowDate,
        visitedDateEnd: fakeNowDate,
      })
      const updateGuideDto = getUpdateGuideDtoMock({
        id: guide.id,
        name: guideName,
        visitedDateStart: undefined,
        visitedDateEnd: undefined,
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: guideName,
        visitedDateStart: fakeNowDate,
        visitedDateEnd: fakeNowDate,
      })
      prisma.guide.update.mockResolvedValueOnce(guide)

      const updatedGuideDto = await service.update(updateGuideDto.id, updateGuideDto)
      expect(prisma.guide.update.mock.calls[0][0].data.visitedDateStart.toString()).toEqual(fakeNowDate.toString())
      expect(prisma.guide.update.mock.calls[0][0].data.visitedDateEnd.toString()).toEqual(fakeNowDate.toString())
      expect(updatedGuideDto).toEqual(expectedGuideDto)
      expect(updatedGuideDto.visitedDateStart.toDateString()).toEqual(expectedGuideDto.visitedDateStart.toDateString())
      expect(updatedGuideDto.visitedDateEnd.toDateString()).toEqual(expectedGuideDto.visitedDateEnd.toDateString())
      jest.useRealTimers()
    })

    it("should update guide containing visited date end same as start if end date wasn't provided", async () => {
      const startDate = new Date("2021-01-01")
      const guideName = "New guide 1"
      const guide = getGuideMock({
        id: "new-guide-id",
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: startDate,
      })
      const updateGuideDto = getUpdateGuideDtoMock({
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: undefined,
      })
      const expectedGuideDto = getGuideDtoMock({
        id: guide.id,
        name: guideName,
        visitedDateStart: startDate,
        visitedDateEnd: startDate,
      })
      prisma.guide.update.mockResolvedValueOnce(guide)

      const updatedGuideDto = await service.update(updateGuideDto.id, updateGuideDto)

      expect(prisma.guide.update.mock.calls[0][0].data.visitedDateEnd.toString()).toEqual(startDate.toString())
      expect(updatedGuideDto).toEqual(expectedGuideDto)
      expect(updatedGuideDto.visitedDateStart.toDateString()).toEqual(expectedGuideDto.visitedDateStart.toDateString())
      expect(updatedGuideDto.visitedDateEnd.toDateString()).toEqual(expectedGuideDto.visitedDateEnd.toDateString())
    })

    it("should throw an error", async () => {
      const updateGuideDto = getUpdateGuideDtoMock()
      const error = new Error("Test error")
      prisma.guide.update.mockRejectedValueOnce(error)

      try {
        await service.update(updateGuideDto.id, updateGuideDto)
      } catch (error) {
        expect(error).toEqual(error)
      }
    })
  })

  describe("Get guides", () => {
    it("should return an empty array of guides when page size equals 0", async () => {
      const paginationQuery: PaginationQuery = {
        pageSize: 0,
        page: 1,
      }
      prisma.guide.findMany.mockResolvedValueOnce([])
      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([])
    })

    it("should return an empty array of guides when page is 0", async () => {
      const paginationQuery: PaginationQuery = {
        pageSize: 1,
        page: 0,
      }
      prisma.guide.findMany.mockResolvedValueOnce([])
      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([])
    })

    it("should return an array of guide including visited date fields", async () => {
      const startDate = new Date("2021-01-01")
      const endDate = new Date("2021-01-02")
      const guideMock = getGuideMock({
        id: "1",
        visitedDateStart: startDate,
        visitedDateEnd: endDate,
      })
      const guideDtoMock = getGuideDtoMock({ id: "1", visitedDateStart: startDate, visitedDateEnd: endDate })
      const paginationQuery: PaginationQuery = {
        pageSize: 1,
        page: 1,
      }
      prisma.guide.findMany.mockResolvedValueOnce([guideMock])

      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([guideDtoMock])
      expect(guides[0].visitedDateStart.toDateString()).toEqual(guideDtoMock.visitedDateStart.toDateString())
      expect(guides[0].visitedDateEnd.toDateString()).toEqual(guideDtoMock.visitedDateEnd.toDateString())
    })

    it("should throw an error", async () => {
      const error = new Error("Test error")
      prisma.guide.findMany.mockRejectedValueOnce(error)
      const paginationQuery: PaginationQuery = {
        pageSize: 2,
        page: 1,
      }

      try {
        await service.findAll(paginationQuery)
      } catch (error) {
        expect(error).toEqual(error)
      }
    })

    it("should return array containing 2 guides", async () => {
      const guideMock = getGuideMock({
        id: "1",
      })
      const guideDtoMock = getGuideDtoMock({ id: "1" })
      const guideMock2 = getGuideMock({
        id: "2",
      })
      const guideDtoMock2 = getGuideDtoMock({ id: "2" })
      const paginationQuery: PaginationQuery = {
        pageSize: 2,
        page: 1,
      }
      prisma.guide.findMany.mockResolvedValueOnce([guideMock, guideMock2])

      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([guideDtoMock, guideDtoMock2])
    })

    it("should return array containing 1 guide with categories", async () => {
      const guideCategoryMock = getGuideCategoryMock({ key: "category1" })
      const guideMock = getGuideMock({
        id: "1",
        categories: [guideCategoryMock],
      })
      const guideDtoMock = getGuideDtoMock({ id: "1", categories: [guideCategoryMock] })
      const paginationQuery: PaginationQuery = {
        pageSize: 1,
        page: 1,
      }
      prisma.guide.findMany.mockResolvedValueOnce([guideMock])

      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([guideDtoMock])
      expect(guides[0].categories).toEqual([guideCategoryMock])
    })

    it("should return array containing 1 guide with primary images", async () => {
      const imageMock = getImageMock()
      const guideMock = getGuideMock({
        id: "1",
        primaryImages: [imageMock],
      })
      const guideDtoMock = getGuideDtoMock({ id: "1", primaryImages: [imageMock] })
      const paginationQuery: PaginationQuery = {
        pageSize: 1,
        page: 1,
      }
      prisma.guide.findMany.mockResolvedValueOnce([guideMock])

      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([guideDtoMock])
      expect(guides[0].primaryImages[0]).toEqual(imageMock)
    })

    it("should return array containing 1 guide with content images", async () => {
      const imageMock = getImageMock()
      const guideMock = getGuideMock({
        id: "1",
        contentImages: [imageMock],
      })
      const guideDtoMock = getGuideDtoMock({ id: "1", contentImages: [imageMock] })
      const paginationQuery: PaginationQuery = {
        pageSize: 1,
        page: 1,
      }
      prisma.guide.findMany.mockResolvedValueOnce([guideMock])

      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([guideDtoMock])
      expect(guides[0].contentImages).toEqual(guideDtoMock.contentImages)
    })

    it("should return array containing 1 guide with countries", async () => {
      const guideMock = getGuideMock({
        id: "1",
        countries: [getCountryMock()],
      })
      const guideDtoMock = getGuideDtoMock({ id: "1", countries: [getCountryMock()] })
      const paginationQuery: PaginationQuery = {
        pageSize: 1,
        page: 1,
      }
      prisma.guide.findMany.mockResolvedValueOnce([guideMock])

      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([guideDtoMock])
      expect(guides[0].countries).toEqual(guideDtoMock.countries)
    })

    it("should return array containing 1 guide with cities", async () => {
      const guideMock = getGuideMock({
        id: "1",
        cities: [getCityMock()],
      })
      const guideDtoMock = getGuideDtoMock({ id: "1", cities: [getCityMock()] })
      const paginationQuery: PaginationQuery = {
        pageSize: 1,
        page: 1,
      }
      prisma.guide.findMany.mockResolvedValueOnce([guideMock])

      const guides = await service.findAll(paginationQuery)

      expect(guides).toEqual([guideDtoMock])
      expect(guides[0].cities).toEqual(guideDtoMock.cities)
    })
  })

  describe("Get guide", () => {
    it("should return a guide", async () => {
      const guideMock = getGuideMock({
        id: "1",
      })
      const guideDtoMock = getGuideDtoMock({ id: "1" })
      prisma.guide.findUnique.mockResolvedValueOnce(guideMock)

      const guide = await service.findOne(guideMock.id)

      expect(guide).toEqual(guideDtoMock)
    })

    it("should return a guide containing visited date fields", async () => {
      const startDate = new Date("2021-01-01")
      const endDate = new Date("2021-01-02")
      const guideMock = getGuideMock({
        id: "1",
        visitedDateStart: startDate,
        visitedDateEnd: endDate,
      })
      const guideDtoMock = getGuideDtoMock({ id: "1", visitedDateStart: startDate, visitedDateEnd: endDate })
      prisma.guide.findUnique.mockResolvedValueOnce(guideMock)

      const guideDto = await service.findOne(guideMock.id)
      expect(guideDto).toEqual(guideDtoMock)
      expect(guideDto.visitedDateStart.toDateString()).toEqual(guideDtoMock.visitedDateStart.toDateString())
      expect(guideDto.visitedDateEnd.toDateString()).toEqual(guideDtoMock.visitedDateEnd.toDateString())
    })

    it("should return a guide containing category", async () => {
      const guideCategoryMock = getGuideCategoryMock({ key: "category1" })
      const guideMock = getGuideMock({
        id: "1",
        categories: [guideCategoryMock],
      })
      const guideDtoMock = getGuideDtoMock({ id: "1", categories: [guideCategoryMock] })
      prisma.guide.findUnique.mockResolvedValueOnce(guideMock)

      const guideDto = await service.findOne(guideMock.id)

      expect(guideDto).toEqual(guideDtoMock)
      expect(guideDto.categories).toEqual(guideDtoMock.categories)
    })

    it("should throw an error", async () => {
      const guideMock = getGuideMock({
        id: "1",
      })
      const error = new Error("Test error")
      prisma.guide.findUnique.mockRejectedValueOnce(error)

      try {
        await service.findOne(guideMock.id)
      } catch (error) {
        expect(error).toEqual(error)
      }
    })
  })
})
