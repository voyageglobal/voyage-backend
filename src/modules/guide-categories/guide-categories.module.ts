import { Module } from "@nestjs/common"
import { GuideCategoriesService } from "./guide-categories.service"
import { GuideCategoriesController } from "./guide-categories.controller"

@Module({
  controllers: [GuideCategoriesController],
  providers: [GuideCategoriesService],
})
export class GuideCategoriesModule {}
