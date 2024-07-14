import { Injectable } from "@nestjs/common"
import { TotalStatsDto } from "./dto/total-stats.dto"

@Injectable()
export class StatsService {
  async getTotalStats(): Promise<TotalStatsDto> {
    return {
      totalUsers: 1000,
      totalCities: 200,
      totalGuides: 50,
      totalCountries: 50,
    }
  }
}
