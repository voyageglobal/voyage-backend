import { Logger, Module } from "@nestjs/common"
import { PrismaModule } from "../prisma/prisma.module"
import { StatsService } from "./stats.service"
import { StatsController } from "./stats.controller"

@Module({
  imports: [PrismaModule],
  controllers: [StatsController],
  providers: [StatsService, Logger],
})
export class StatsModule {}
