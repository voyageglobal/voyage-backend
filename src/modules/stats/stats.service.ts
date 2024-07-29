import { Injectable, Logger } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { TotalStatsDto } from "./dto/total-stats.dto"

@Injectable()
export class StatsService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async getTotalStats(): Promise<TotalStatsDto> {
    try {
      const [totalCities, totalCountries, totalGuides] = await this.prismaService.$transaction([
        this.prismaService.city.count({
          where: {
            deleted: false,
            guides: {
              some: {
                deleted: false,
              },
            },
          },
        }),
        this.prismaService.country.count({
          where: {
            deleted: false,
            guides: {
              some: {
                deleted: false,
              },
            },
          },
        }),
        this.prismaService.guide.count({
          where: {
            deleted: false,
          },
        }),
      ])

      return {
        totalUsers: 0,
        totalCities: totalCities,
        totalGuides: totalGuides,
        totalCountries: totalCountries,
      }
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to get total stats: ${error.message}`)
        throw new Error("Failed to get total stats")
      }

      this.logger.error("Unexpected error getting total stats")
      throw new Error("Unexpected error getting total stats")
    }
  }
}
