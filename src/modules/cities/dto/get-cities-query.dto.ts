import { Type } from "class-transformer"
import { IsEnum, IsInt, IsString } from "class-validator"
import { PaginationQuery } from "../../common/types"

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
  @Type(() => String)
  sortOrder: CitiesSortOrder = CitiesSortOrder.NAME_ASC
}
