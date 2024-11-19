import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger"
import { plainToInstance } from "class-transformer"
import { JwtAuthGuard } from "../auth/jwt-auth-guard"
import { CreateGuideResponseDto } from "./dto/create-guide-response.dto"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { GetGuideResponseDto } from "./dto/get-guide-response.dto"
import { GetGuidesQueryDto } from "./dto/get-guides-query.dto"
import { GetGuidesRequestQueryDto } from "./dto/get-guides-request-query.dto"
import { GetGuidesResponseDto } from "./dto/get-guides-response.dto"
import { GuideDto } from "./dto/guide.dto"
import { RemoveGuideResponseDto } from "./dto/remove-guide-response.dto"
import { UpdateGuideResponseDto } from "./dto/update-guide-response.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"
import { GuidesService } from "./guides.service"

@ApiTags("guides")
@ApiBearerAuth()
@Controller("guides")
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Create a new guide" })
  @ApiCreatedResponse({
    description: "The guide has been successfully created.",
    type: CreateGuideResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @ApiBody({ type: CreateGuideDto, required: true, description: "The guide to create" })
  async create(@Body() createGuideDto: CreateGuideDto): Promise<CreateGuideResponseDto> {
    // TODO: Put input validation here

    try {
      const creationResult = await this.guidesService.create(createGuideDto)

      return {
        data: creationResult,
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

      return {
        data: null,
        errors: [
          {
            message: "Unexpected error creating guide",
            name: "UnexpectedError",
            stack: null,
          },
        ],
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: "Get guides by query",
  })
  @ApiQuery({ name: "page", type: Number, required: false, example: 1, description: "The page number" })
  @ApiQuery({ name: "pageSize", type: Number, required: false, example: 10, description: "The page size" })
  @ApiQuery({
    name: "orderBy",
    type: String,
    required: false,
    example: "name",
    description: "The order by field",
  })
  @ApiQuery({
    name: "orderDirection",
    type: String,
    required: false,
    example: "asc",
    enum: ["asc", "desc"],
    description: "The order direction",
  })
  @ApiQuery({
    name: "searchString",
    type: String,
    required: false,
    example: "Paris",
    description: "Search string",
  })
  @ApiQuery({
    name: "guideCategories",
    type: String,
    required: false,
    example: "nature,history",
    description: "The filter by guide categories by comma separated values",
  })
  @ApiOkResponse({
    description: "The guides have been successfully retrieved.",
    type: GetGuidesResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )
    paginationQuery: GetGuidesRequestQueryDto,
  ): Promise<GetGuidesResponseDto> {
    try {
      const guidesQuery = plainToInstance(GetGuidesQueryDto, paginationQuery)

      const page = await this.guidesService.findAll(guidesQuery)

      return {
        data: page,
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

      return {
        data: null,
        errors: [
          {
            message: "Unexpected error getting guides",
            name: "UnexpectedError",
            stack: null,
          },
        ],
      }
    }
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    example: "9a55ee15-d3b6-464f-85b8-755d314b33c1",
    description: "Guide id",
  })
  @ApiOperation({ summary: "Get a guide by id" })
  @ApiOkResponse({
    type: GuideDto,
    description: "The guide has been successfully retrieved.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiNotFoundResponse({
    description: "Guide not found",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async findOne(@Param("id") id: string): Promise<GetGuideResponseDto> {
    try {
      const result = await this.guidesService.findOne(id)

      return {
        data: result,
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

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a guide by id" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateGuideDto, required: true, description: "The guide to update" })
  @ApiOkResponse({
    description: "The guide has been successfully updated.",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiNotFoundResponse({
    description: "Guide not found",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async update(@Param("id") id: string, @Body() updateGuideDto: UpdateGuideDto): Promise<UpdateGuideResponseDto> {
    try {
      const result = await this.guidesService.update(id, updateGuideDto)

      return {
        data: result,
        errors: null,
      }
    } catch (err) {
      if (err instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: err.message,
              name: err.name,
              stack: err.stack,
            },
          ],
        }
      }

      return {
        data: null,
        errors: [
          {
            message: "Unexpected error updating guide",
            name: "UnexpectedError",
            stack: null,
          },
        ],
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a guide by id" })
  @ApiParam({ name: "id", type: String })
  @ApiOkResponse({
    description: "The guide has been successfully deleted.",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiNotFoundResponse({
    description: "Guide not found",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async remove(@Param("id") id: string): Promise<RemoveGuideResponseDto> {
    try {
      const removedGuide = await this.guidesService.remove(id)

      return {
        data: removedGuide,
        errors: null,
      }
    } catch (err) {
      if (err instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: err.message,
              name: err.name,
              stack: err.stack,
            },
          ],
        }
      }

      return {
        data: null,
        errors: [
          {
            message: "Unexpected error removing guide",
            name: "UnexpectedError",
            stack: null,
          },
        ],
      }
    }
  }
}
