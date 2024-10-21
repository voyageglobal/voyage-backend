import { Type } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"
import { PaginationQuery } from "../../common/types"

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
}
