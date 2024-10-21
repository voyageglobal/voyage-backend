import { Injectable, Logger } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { plainToClass, plainToInstance } from "class-transformer"
import { PRISMA_ERROR_CODES } from "../common/constants"
import { PageDto } from "../common/types"
import { getValidPageNumber, getValidPageSize } from "../common/utils/pagination"
import { PrismaService } from "../prisma/prisma.service"
import { DEFAULT_GUIDES_PAGE_SIZE } from "./constants"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { GetGuidesQueryDto } from "./dto/get-guides-query.dto"
import { GuideDto } from "./dto/guide.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"
import { getGuidesSearchStringFilter } from "./utils"

@Injectable()
export class GuidesService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createGuideDto: CreateGuideDto): Promise<GuideDto> {
    const visitedDateStart = createGuideDto.visitedDateStart ?? new Date()
    const visitedDateEnd = createGuideDto.visitedDateEnd ?? createGuideDto.visitedDateStart ?? new Date()

    try {
      const createdGuide = await this.prismaService.guide.create({
        data: {
          name: createGuideDto.name,
          text: createGuideDto.text,
          visitedDateStart: visitedDateStart,
          visitedDateEnd: visitedDateEnd,
          primaryImages: {
            // TODO: possibly replace on connect due to the fact the image upload should create an image record
            // or connectAndCreate at least
            create: createGuideDto.primaryImages,
          },
          contentImages: {
            // TODO: possibly replace on connect due to the fact the image upload should create an image record
            // or connectAndCreate at least
            create: createGuideDto?.contentImages,
          },
          countries: {
            connect: createGuideDto.countries.map(countryId => {
              return {
                id: countryId,
              }
            }),
          },
          cities: {
            connect: createGuideDto.cities.map(cityId => {
              return {
                id: cityId,
              }
            }),
          },
          categories: {
            connect: createGuideDto.categories.map(categoryKey => {
              return {
                key: categoryKey,
              }
            }),
          },
        },
        include: {
          categories: true,
          primaryImages: true,
          contentImages: true,
          cities: true,
          countries: true,
        },
      })

      const createdGuideDto = plainToInstance(GuideDto, createdGuide)

      return createdGuideDto
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
          this.logger.error(`Error creating guide: model - ${error.meta?.modelName}, target - ${error.meta?.target}`)
          this.logger.error(error)
          throw new Error("Guide with this name already exists")
        }
      }

      if (error instanceof Error) {
        this.logger.error(`Error creating guide: ${error.message}`)

        throw error
      }

      this.logger.error("Unexpected error creating guide")
      throw error
    }
  }

  async findOne(id: string): Promise<GuideDto | null> {
    try {
      const guide = await this.prismaService.guide.findUnique({
        include: {
          primaryImages: true,
          contentImages: true,
          categories: true,
          countries: true,
          cities: true,
        },
        where: { id, deleted: false },
      })

      const guideDto = plainToInstance(GuideDto, guide)

      return guideDto
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error fetching guide: ${error.message}`)

        throw error
      }

      this.logger.error("Unexpected error fetching guide")
      throw error
    }
  }

  async findAll(query: GetGuidesQueryDto): Promise<PageDto<GuideDto>> {
    const pageSize = getValidPageSize({
      pageSize: query?.pageSize,
      defaultPageSize: DEFAULT_GUIDES_PAGE_SIZE,
    })
    const page = getValidPageNumber({
      page: query?.page,
    })
    const orderBy = query?.orderBy
    const orderDirection = query?.orderDirection
    const searchStringFilter = getGuidesSearchStringFilter(query?.searchString)

    try {
      const [results, total] = await this.prismaService.$transaction([
        this.prismaService.guide.findMany({
          include: {
            primaryImages: true,
            contentImages: true,
            categories: true,
            cities: true,
            countries: true,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            deleted: false,
            ...searchStringFilter,
          },
          orderBy: {
            [orderBy]: orderDirection,
          },
        }),
        this.prismaService.guide.count({
          where: {
            deleted: false,
            ...searchStringFilter,
          },
        }),
      ])

      const hasMore = total > page * pageSize
      const guideDtos = plainToInstance(GuideDto, results)
      const guidesPage = new PageDto<GuideDto>(guideDtos, total, page, pageSize, hasMore)

      return guidesPage
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error fetching guides: ${error.message}`)

        throw error
      }

      this.logger.error("Unexpected error fetching guides")
      throw error
    }
  }

  async update(id: string, updateGuideDto: UpdateGuideDto): Promise<GuideDto> {
    const visitedDateStart = updateGuideDto.visitedDateStart ?? new Date()
    const visitedDateEnd = updateGuideDto.visitedDateEnd ?? updateGuideDto.visitedDateStart ?? new Date()

    const updatedGuide = this.prismaService.guide.update({
      data: {
        id: id,
        name: updateGuideDto.name,
        text: updateGuideDto.text,
        visitedDateStart: visitedDateStart,
        visitedDateEnd: visitedDateEnd,
        primaryImages: {
          // TODO: possibly replace on connect due to the fact the image upload should create an image record
          // or connectAndCreate at least
          create: updateGuideDto.primaryImages,
        },
        contentImages: {
          // TODO: possibly replace on connect due to the fact the image upload should create an image record
          // or connectAndCreate at least
          create: updateGuideDto?.contentImages,
        },
        countries: {
          connect: updateGuideDto.countries.map(countryId => {
            return {
              id: countryId,
            }
          }),
        },
        cities: {
          connect: updateGuideDto.cities.map(cityId => {
            return {
              id: cityId,
            }
          }),
        },
        categories: {
          connect: updateGuideDto.categories.map(categoryKey => {
            return {
              key: categoryKey,
            }
          }),
        },
      },
      include: {
        primaryImages: true,
        contentImages: true,
        categories: true,
        cities: true,
        countries: true,
      },
      where: { id, deleted: false },
    })

    const updatedGuideDto = plainToClass(GuideDto, updatedGuide)

    return updatedGuideDto
  }

  async remove(id: string) {
    const removedGuide = await this.prismaService.guide.delete({ where: { id } })

    const removedGuideDto = plainToClass(GuideDto, removedGuide)

    return removedGuideDto
  }
}
