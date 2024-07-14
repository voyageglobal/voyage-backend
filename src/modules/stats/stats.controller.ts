import { Controller, Get } from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"
import { GetTotalStatsResponseDto } from "./dto/get-total-stats-response.dto"
import { StatsService } from "./stats.service"

@ApiTags("stats")
@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get("/total")
  @ApiOperation({ summary: "Get total stats" })
  @ApiOkResponse({
    type: GetTotalStatsResponseDto,
    description: "Total stats",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async getTotalStats(): Promise<GetTotalStatsResponseDto> {
    try {
      const result = await this.statsService.getTotalStats()

      return {
        data: result,
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: error.message,
              name: error.name,
              stack: error.stack,
            },
          ],
        }
      }
    }
  }
}
