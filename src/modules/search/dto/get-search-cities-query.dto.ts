import { IsInt, IsString } from "class-validator"
import { PaginationQuery } from "../../common/types"
import { Type } from "class-transformer"

export class GetSearchCitiesQueryDto implements PaginationQuery {
  @IsString()
  searchString: string

  @IsInt()
  @Type(() => Number)
  page: number

  @IsInt()
  @Type(() => Number)
  pageSize: number
}
