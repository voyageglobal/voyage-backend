import { Injectable, Logger } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { PageDto } from "../common/types"
import { CityDto } from "../cities/dto/city.dto"
import { GetSearchCitiesQueryDto } from "./dto/get-search-cities-query.dto"
import { getValidPageNumber, getValidPageSize } from "../common/utils/pagination"
import { plainToInstance } from "class-transformer"
import { getSearchStringFilter } from "./utils"

@Injectable()
export class SearchService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async findCities(paginationQuery: GetSearchCitiesQueryDto): Promise<PageDto<CityDto>> {
    const pageSize = getValidPageSize({ pageSize: paginationQuery?.pageSize })
    const page = getValidPageNumber({ page: paginationQuery?.page })
    const searchStringFilter = getSearchStringFilter(paginationQuery?.searchString)

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
            ...searchStringFilter,
          },
        }),
        this.prismaService.city.count({
          where: {
            deleted: false,
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
        this.logger.error(`Error searching cities: ${error.toString()}`)

        throw error
      }
    }
  }
}
