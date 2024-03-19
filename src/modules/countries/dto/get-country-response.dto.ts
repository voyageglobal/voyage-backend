import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { CountryDto } from "./country.dto"

export class GetCountryResponseDto implements ApiResponse<CountryDto> {
  @ApiProperty({
    type: CountryDto,
    description: "Country",
    required: true,
    example: {
      id: "1",
      name: "Ukraine",
      description: "Ukraine is a country in Eastern Europe.",
      cities: [],
      images: [],
      deleted: false,
    },
  })
  data: CountryDto

  @ApiProperty({
    type: ApiError,
    description: "Error message",
    required: false,
    example: [
      {
        message: "Country not found",
        name: "NotFoundError",
        stack: `Error: Country not found\n    at Object.<anonymous> (/app/src/modules/countries/countries.controller.ts:40:15)`,
      },
    ],
  })
  errors: ApiError[] | null
}
