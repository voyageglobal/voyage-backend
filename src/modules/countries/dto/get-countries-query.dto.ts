import { Type } from "class-transformer"
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { PaginationQuery } from "../../common/types"

export enum CountriesSortOrder {
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
}

export class GetCountriesQueryDto implements PaginationQuery {
  @IsInt()
  @Type(() => Number)
  page: number

  @IsInt()
  @Type(() => Number)
  pageSize: number

  @IsString()
  @IsEnum(CountriesSortOrder)
  @IsOptional()
  @Type(() => String)
  sortOrder?: CountriesSortOrder = CountriesSortOrder.NAME_ASC

  @IsString()
  @IsOptional()
  @Type(() => String)
  searchString?: string
}
