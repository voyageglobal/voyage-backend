import { Injectable, Logger } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { PageDto } from "../common/types"
import { getValidPageNumber, getValidPageSize } from "../common/utils/pagination"
import { PrismaService } from "../prisma/prisma.service"
import { DEFAULT_COUNTRIES_PAGE_SIZE } from "./constants"
import { CountryDto } from "./dto/country.dto"
import { GetCountriesQueryDto } from "./dto/get-countries-query.dto"
import { getCountriesQueryOrderBy, getSearchStringFilter } from "./utils"

@Injectable()
export class CountriesService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(query: GetCountriesQueryDto): Promise<PageDto<CountryDto>> {
    const pageSize = getValidPageSize({
      pageSize: query?.pageSize,
      defaultPageSize: DEFAULT_COUNTRIES_PAGE_SIZE,
    })
    const page = getValidPageNumber({ page: query?.page })
    const orderBy = getCountriesQueryOrderBy(query.sortOrder)
    const searchStringFilter = getSearchStringFilter(query?.searchString)

    try {
      const [results, total] = await this.prismaService.$transaction([
        this.prismaService.country.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            deleted: false,
            ...searchStringFilter,
          },
          include: {
            images: true,
          },
          orderBy: orderBy,
        }),
        this.prismaService.country.count({
          where: {
            deleted: false,
            ...searchStringFilter,
          },
        }),
      ])

      const hasMore = total > page * pageSize
      const countriesDtos = plainToInstance(CountryDto, results)
      const countriesPage = new PageDto<CountryDto>(countriesDtos, total, page, pageSize, hasMore)

      return countriesPage
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error getting countries: ${error.toString()}`)

        throw error
      }
    }
  }

  async findOne(id: string): Promise<CountryDto | null> {
    try {
      const result = await this.prismaService.country.findUnique({
        where: { id, deleted: false },
      })

      if (result) {
        const countryDto = plainToInstance(CountryDto, result)

        return countryDto
      }

      return null
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error getting country: ${error.toString()}`)

        throw error
      }
    }
  }
}
