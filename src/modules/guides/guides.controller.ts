import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"
import { GuidesService } from "./guides.service"

@Controller("guides")
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  create(@Body() createGuideDto: CreateGuideDto) {
    return this.guidesService.create(createGuideDto)
  }

  @Get()
  findAll() {
    return this.guidesService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.guidesService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(+id, updateGuideDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.guidesService.remove(+id)
  }
}
