import { Logger, Module } from "@nestjs/common"
import { SearchService } from "./search.service"
import { SearchController } from "./search.controller"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [SearchController],
  providers: [SearchService, Logger],
})
export class SearchModule {}
