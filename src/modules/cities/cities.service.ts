import { Injectable, Logger } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { PageDto } from "../common/types"
import { getValidPageNumber, getValidPageSize } from "../common/utils/pagination"
import { PrismaService } from "../prisma/prisma.service"
import { CityDto } from "./dto/city.dto"
import { GetCitiesQueryDto } from "./dto/get-cities-query.dto"
import { getCitiesQueryOrderBy, getSearchStringFilter } from "./utils"

@Injectable()
export class CitiesService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(query: GetCitiesQueryDto): Promise<PageDto<CityDto>> {
    const pageSize = getValidPageSize({ pageSize: query?.pageSize })
    const page = getValidPageNumber({ page: query?.page })
    const orderBy = getCitiesQueryOrderBy(query.sortOrder)
    const onlyWithGuides = query?.onlyWithGuides ?? false
    const searchString = query?.searchString
    const searchStringFilter = getSearchStringFilter(searchString)

    try {
      const [results, total] = await this.prismaService.$transaction([
        this.prismaService.city.findMany({
          include: {
            country: true,
            images: true,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            deleted: false,
            ...(onlyWithGuides && {
              guides: {
                some: {
                  deleted: false,
                },
              },
            }),
            ...searchStringFilter,
          },
          orderBy: orderBy,
        }),
        this.prismaService.city.count({
          where: {
            deleted: false,
            ...(onlyWithGuides && {
              guides: {
                some: {
                  deleted: false,
                },
              },
            }),
            ...searchStringFilter,
          },
        }),
      ])
      const hasMore = total > page * pageSize

      const citiesDtos = plainToInstance(CityDto, results)
      const citiesPage = new PageDto<CityDto>(citiesDtos, total, page, pageSize, hasMore)

      return citiesPage
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error getting cities: ${error.toString()}`)

        throw error
      }
    }
  }

  async findOne(id: string): Promise<CityDto | null> {
    try {
      const result = await this.prismaService.city.findUnique({
        where: { id, deleted: false },
        include: {
          country: true,
          images: true,
        },
      })

      const cityDto = plainToInstance(CityDto, result)

      return cityDto
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error fetching city: ${error.message}`)

        throw error
      }
    }
  }
}
