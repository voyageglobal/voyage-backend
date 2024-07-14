import { ApiProperty } from "@nestjs/swagger"

export class TotalStatsDto {
  @ApiProperty({
    example: 1000,
    description: "Total users having guides",
  })
  totalUsers: number

  @ApiProperty({
    example: 200,
    description: "Total cities having guides",
  })
  totalCities: number

  @ApiProperty({
    example: 50,
    description: "Total countries having guides",
  })
  totalCountries: number

  @ApiProperty({
    example: 50,
    description: "Total guides",
  })
  totalGuides: number
}
