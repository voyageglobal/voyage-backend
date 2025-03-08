import { Controller, Get, Query, ValidationPipe } from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger"
import { GetSearchCitiesResponseDto } from "./dto/get-search-cities-response.dto"
import { SearchService } from "./search.service"
import { GetSearchCitiesQueryDto } from "./dto/get-search-cities-query.dto"
import { CitiesSortOrder } from "../cities/dto/get-cities-query.dto"

@ApiTags("search")
@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("cities")
  @ApiOperation({ summary: "Search cities by query" })
  @ApiQuery({
    name: "pageSize",
    required: false,
    type: Number,
    example: 10,
    description: "Limit of cities",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    example: 1,
    description: "Page number",
  })
  @ApiQuery({
    name: "searchString",
    required: true,
    type: String,
    example: "Paris",
    description: "Search string",
  })
  @ApiQuery({
    name: "onlyWithGuides",
    required: false,
    type: Boolean,
    example: true,
    description: "Only with guides",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    enum: [
      CitiesSortOrder.POPULARITY_ASC,
      CitiesSortOrder.POPULARITY_DESC,
      CitiesSortOrder.NAME_ASC,
      CitiesSortOrder.NAME_DESC,
    ],
    description: "Sort order",
  })
  @ApiOkResponse({
    type: GetSearchCitiesResponseDto,
    description: "Cities have been successfully received.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async findCities(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    paginationQuery: GetSearchCitiesQueryDto,
  ): Promise<GetSearchCitiesResponseDto> {
    try {
      const data = await this.searchService.findCities(paginationQuery)

      return {
        data,
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: error.message,
              name: error.name,
              stack: error.stack,
            },
          ],
        }
      }
    }
  }
}
