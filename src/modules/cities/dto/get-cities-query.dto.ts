import { Transform, Type } from "class-transformer"
import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { type PaginationQuery } from "../../common/types"
import { transformCommaSeparatedStringToArray } from "../../common/utils/api-query/transform-string-to-array"

export enum CitiesSortOrder {
  POPULARITY_ASC = "POPULARITY_ASC",
  POPULARITY_DESC = "POPULARITY_DESC",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
}

export class GetCitiesQueryDto implements PaginationQuery {
  @IsInt()
  @Type(() => Number)
  page: number

  @IsInt()
  @Type(() => Number)
  pageSize: number

  @IsString()
  @IsEnum(CitiesSortOrder)
  @IsOptional()
  @Type(() => String)
  sortOrder?: CitiesSortOrder = CitiesSortOrder.NAME_ASC

  @IsString()
  @IsOptional()
  @Type(() => String)
  searchString?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === "boolean") return value
    if (typeof value === "string") return value === "true"

    return false
  })
  onlyWithGuides?: boolean

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => transformCommaSeparatedStringToArray(value))
  countries?: string[]
}
