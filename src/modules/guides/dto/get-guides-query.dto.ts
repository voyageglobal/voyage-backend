import { Transform, Type } from "class-transformer"
import { IsArray, IsInt, IsOptional, IsString } from "class-validator"
import { PaginationQuery } from "../../common/types"
import { transformCommaSeparatedStringToArray } from "../../common/utils/api-query"

export type GuidesSortDirection = "asc" | "desc"

export class GetGuidesQueryDto implements PaginationQuery {
  @IsInt()
  @Type(() => Number)
  page: number

  @IsInt()
  @Type(() => Number)
  pageSize: number

  @IsString()
  @Type(() => String)
  @IsOptional()
  orderBy?: string

  @IsString()
  @Type(() => String)
  @IsOptional()
  orderDirection?: GuidesSortDirection = "asc"

  @IsString()
  @IsOptional()
  @Type(() => String)
  searchString?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => transformCommaSeparatedStringToArray(value))
  guideCategories?: string[]
}
