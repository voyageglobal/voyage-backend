import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"
import { PaginationQuery } from "../../common/types"

export type GuidesSortDirection = "asc" | "desc"

export class GetGuidesRequestQueryDto implements PaginationQuery {
  @ApiProperty({
    description: "The page number",
    required: false,
    default: 1,
  })
  @IsInt()
  @Type(() => Number)
  page: number

  @ApiProperty({
    description: "The page size",
    required: false,
    default: 10,
  })
  @IsInt()
  @Type(() => Number)
  pageSize: number

  @ApiProperty({
    description: "The order by field",
    required: false,
    default: "name",
  })
  @IsString()
  @Type(() => String)
  @IsOptional()
  orderBy?: string

  @ApiProperty({
    description: "The order direction",
    required: false,
    default: "asc",
    enum: ["asc", "desc"],
  })
  @IsString()
  @Type(() => String)
  @IsOptional()
  orderDirection?: GuidesSortDirection = "asc"

  @ApiProperty({
    description: "Search string",
    required: false,
    default: "Paris",
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  searchString?: string

  @ApiProperty({
    description: "Guide categories",
    required: false,
    default: "nature,history",
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  guideCategories?: string
}
