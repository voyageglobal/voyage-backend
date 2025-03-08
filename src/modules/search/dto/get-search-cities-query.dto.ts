import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { PaginationQuery } from "../../common/types"
import { Transform, Type } from "class-transformer"
import { CitiesSortOrder } from "src/modules/cities/dto/get-cities-query.dto"

export class GetSearchCitiesQueryDto implements PaginationQuery {
  @IsString()
  searchString: string

  @IsInt()
  @Type(() => Number)
  page: number

  @IsInt()
  @Type(() => Number)
  pageSize: number

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (typeof value === "boolean") return value
    if (typeof value === "string") return value === "true"

    return false
  })
  onlyWithGuides?: boolean

  @IsString()
  @IsEnum(CitiesSortOrder)
  @IsOptional()
  @Type(() => String)
  sortOrder?: CitiesSortOrder = CitiesSortOrder.NAME_ASC
}
